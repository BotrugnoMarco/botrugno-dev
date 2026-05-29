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

# 3. Verifica config e ricarica nginx
nginx -t && systemctl reload nginx

echo "✓ Deploy completato — http://$DOMAIN"
