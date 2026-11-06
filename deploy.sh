#!/bin/bash
set -e

REPO="https://github.com/BotrugnoMarco/botrugno-dev.git"
APP_DIR="/botrugno.dev"
DOMAIN="botrugno.dev"
BRANCH="main"

# 1. Scarica sempre da GitHub: il server deve essere identico al repo.
# Una modifica fatta a mano sul server viene sovrascritta (node_modules, dist e gli altri
# file non tracciati restano). Poi riparte dal deploy.sh appena scaricato: così vale sempre
# la versione nuova, e bash non si ritrova il file cambiato mentre lo sta leggendo.
if [ "$1" != "--aggiornato" ]; then
  echo "→ Deploy di $DOMAIN"
  if [ -d "$APP_DIR/.git" ]; then
    echo "→ Scarico da GitHub..."
    git -C "$APP_DIR" fetch origin "$BRANCH"
    git -C "$APP_DIR" checkout --force -B "$BRANCH" "origin/$BRANCH"
  else
    echo "→ Clone del repo..."
    git clone --branch "$BRANCH" "$REPO" "$APP_DIR"
  fi
  exec bash "$APP_DIR/deploy.sh" --aggiornato
fi

cd "$APP_DIR"
chmod +x deploy.sh

# Se non è il commit che ti aspetti, manca il push dal tuo PC.
echo "→ Versione: $(git log -1 --format='%h %s (%cd)' --date=format:'%d/%m/%Y %H:%M')"

# 2. Installa dipendenze e build
echo "→ Installazione dipendenze..."
npm ci
echo "→ Build..."
# Il backend di Match Ready è sullo stesso server: i suoi numeri si leggono senza passare da Cloudflare.
MATCHREADY_STATS_URL="http://127.0.0.1:3000/api/public/stats" npm run build

# Il CV (public/CV_Marco_Luigi_Botrugno.pdf) ora è nel repo e finisce in dist/ con la build.

# 3. Verifica config e ricarica nginx
sudo nginx -t && sudo systemctl reload nginx

echo "✓ Deploy completato — https://$DOMAIN"
