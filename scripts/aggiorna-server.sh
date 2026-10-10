#!/bin/bash
# Aggiorna botrugno.dev sul server in un colpo solo:
#   1. deploy (pull, npm ci, build)
#   2. configurazione nginx da docs/nginx/, con backup e ripristino automatico se nginx -t fallisce
#   3. cancella il vecchio CV con i dati personali
#   4. controlla che il sito risponda come previsto
#
# Uso (sul server):  cd /botrugno.dev && git pull && bash scripts/aggiorna-server.sh
set -euo pipefail

APP_DIR="/botrugno.dev"
SNIPPET="/etc/nginx/snippets/botrugno-security-headers.conf"
OLD_CV="/home/botadmin/CV_Marco_Luigi_Botrugno.pdf"
BACKUP_DIR="$HOME/nginx-backup-$(date +%Y%m%d-%H%M%S)"

ok()   { echo "  ✓ $*"; }
warn() { echo "  ⚠ $*"; }
fail() { echo "  ✗ $*"; exit 1; }

echo "→ 1/4 Deploy del sito"
bash "$APP_DIR/deploy.sh"
[ -f "$APP_DIR/dist/index.html" ] || fail "manca $APP_DIR/dist/index.html: la build non è andata a buon fine"
[ -f "$APP_DIR/dist/CV_Marco_Luigi_Botrugno_EN.pdf" ] || fail "manca il CV inglese in dist/: il codice sul server non è aggiornato"
ok "build presente in $APP_DIR/dist"

echo "→ 2/4 Configurazione nginx"
# Il file attivo che contiene il blocco di botrugno.dev (non quelli di matchready.botrugno.dev ecc.)
mapfile -t FILES < <(sudo grep -lE 'server_name([[:space:]]+[^;[:space:]]+)*[[:space:]]+botrugno\.dev([[:space:]]|;)' \
  /etc/nginx/sites-enabled/* /etc/nginx/conf.d/*.conf 2>/dev/null | xargs -r -n1 readlink -f | sort -u)
[ "${#FILES[@]}" -eq 1 ] || fail "trovati ${#FILES[@]} file con server_name botrugno.dev (${FILES[*]:-nessuno}): sistemali a mano"
TARGET="${FILES[0]}"
ok "file attivo: $TARGET"
echo "    root attuale: $(sudo grep -E '^[[:space:]]*root' "$TARGET" | head -1 | xargs)"
echo "    root nuova:   root $APP_DIR/dist;"

if ! sudo openssl x509 -in /etc/letsencrypt/live/botrugno.dev/fullchain.pem -noout -text | grep -q 'DNS:www.botrugno.dev'; then
  warn "il certificato non include www.botrugno.dev: il redirect www funziona solo tramite Cloudflare"
fi

mkdir -p "$BACKUP_DIR"
sudo cp "$TARGET" "$BACKUP_DIR/"
[ -f "$SNIPPET" ] && sudo cp "$SNIPPET" "$BACKUP_DIR/"
ok "backup in $BACKUP_DIR"

sudo cp "$APP_DIR/docs/nginx/security-headers.conf" "$SNIPPET"
sudo cp "$APP_DIR/docs/nginx/botrugno.dev.conf" "$TARGET"

if sudo nginx -t; then
  sudo systemctl reload nginx
  ok "nginx ricaricato con la nuova configurazione"
else
  warn "nginx -t fallito: ripristino la configurazione precedente"
  sudo cp "$BACKUP_DIR/$(basename "$TARGET")" "$TARGET"
  if [ -f "$BACKUP_DIR/$(basename "$SNIPPET")" ]; then sudo cp "$BACKUP_DIR/$(basename "$SNIPPET")" "$SNIPPET"; else sudo rm -f "$SNIPPET"; fi
  sudo nginx -t && sudo systemctl reload nginx
  fail "configurazione ripristinata, il sito funziona come prima. Mandami l'errore di nginx -t qui sopra"
fi

echo "→ 3/4 Vecchio CV con i dati personali"
if [ -f "$OLD_CV" ]; then rm -f "$OLD_CV"; ok "cancellato $OLD_CV"; else ok "già assente"; fi

echo "→ 4/4 Controlli (dal server, tramite Cloudflare)"
sleep 1
check() { # descrizione, comando che deve riuscire
  if eval "$2" >/dev/null 2>&1; then ok "$1"; else warn "$1: NON verificato"; fi
}
H=$(curl -sI https://botrugno.dev/)
check "home risponde 200"                    "echo \"\$H\" | head -1 | grep -q ' 200'"
check "header HSTS presente"                 "echo \"\$H\" | grep -qi '^strict-transport-security'"
check "header CSP presente"                  "echo \"\$H\" | grep -qi '^content-security-policy'"
check "/cv/ risponde 200"                    "curl -sI https://botrugno.dev/cv/ | head -1 | grep -q ' 200'"
check "CV inglese risponde 200"              "curl -sI https://botrugno.dev/CV_Marco_Luigi_Botrugno_EN.pdf | head -1 | grep -q ' 200'"
check "pagina inesistente risponde 404"      "curl -sI https://botrugno.dev/pagina-che-non-esiste/ | head -1 | grep -q ' 404'"
check "www rimanda a botrugno.dev"           "curl -sI https://www.botrugno.dev/ | grep -qi '^location: https://botrugno.dev/'"

echo
echo "✓ Fatto. Backup della vecchia configurazione: $BACKUP_DIR"
echo "  Per tornare indietro:  sudo cp $BACKUP_DIR/$(basename "$TARGET") $TARGET && sudo systemctl reload nginx"
echo
echo "Restano a mano:"
echo "  - Cloudflare → Caching → Purge Cache → https://botrugno.dev/CV_Marco_Luigi_Botrugno.pdf"
echo "  - Apri il sito con la console del browser (F12): nessun errore 'Content Security Policy'"
