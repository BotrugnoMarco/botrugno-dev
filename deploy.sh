#!/bin/bash
set -e

REPO="https://github.com/BotrugnoMarco/botrugno-dev.git"
APP_DIR="/botrugno.dev"
DOMAIN="botrugno.dev"

echo "→ Deploy di $DOMAIN"

# 1. Clone al primo avvio, pull per gli aggiornamenti
if [ -d "$APP_DIR/.git" ]; then
  echo "→ Aggiornamento repo..."
  git -C "$APP_DIR" pull
else
  echo "→ Clone del repo..."
  git clone "$REPO" "$APP_DIR"
fi

# 2. Installa dipendenze e build
cd "$APP_DIR"
echo "→ Installazione dipendenze..."
npm ci
echo "→ Build..."
npm run build

# 3. Copia CV (file locale, non nel repo)
CV_SOURCE="/home/botadmin/CV_Marco_Luigi_Botrugno.pdf"
if [ -f "$CV_SOURCE" ]; then
  cp "$CV_SOURCE" "$APP_DIR/dist/"
  echo "→ CV copiato in dist/"
else
  echo "⚠ CV non trovato in $CV_SOURCE — caricalo manualmente"
fi

# 4. Verifica config e ricarica nginx
sudo nginx -t && sudo systemctl reload nginx

echo "✓ Deploy completato — https://$DOMAIN"
