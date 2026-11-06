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
chmod +x "$APP_DIR/deploy.sh"

# 2. Installa dipendenze e build
cd "$APP_DIR"
echo "→ Installazione dipendenze..."
npm ci
echo "→ Build..."
# Il backend di Match Ready è sullo stesso server: i suoi numeri si leggono senza passare da Cloudflare.
MATCHREADY_STATS_URL="http://127.0.0.1:3000/api/public/stats" npm run build

# Il CV (public/CV_Marco_Luigi_Botrugno.pdf) ora è nel repo e finisce in dist/ con la build.

# 3. Verifica config e ricarica nginx
sudo nginx -t && sudo systemctl reload nginx

echo "✓ Deploy completato — https://$DOMAIN"
