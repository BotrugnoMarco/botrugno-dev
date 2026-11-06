#!/bin/bash
# Ricompila il sito per aggiornare i numeri di Match Ready. Va lanciato ogni notte dal cron del server:
#   0 5 * * * bash /botrugno.dev/scripts/aggiorna-numeri.sh >> "$HOME/botrugno-numeri.log" 2>&1
#
# Compila in una cartella a parte e la scambia solo alla fine: astro svuota la cartella di
# destinazione, e compilando direttamente in dist/ il sito darebbe 404 per tutta la build,
# o resterebbe rotto se la build fallisce.
set -e

APP_DIR="/botrugno.dev"
cd "$APP_DIR"

MATCHREADY_STATS_URL="http://127.0.0.1:3000/api/public/stats" npx astro build --outDir dist-nuova

rm -rf dist-vecchia
mv dist dist-vecchia
mv dist-nuova dist
rm -rf dist-vecchia

echo "$(date '+%F %T') sito ricompilato"
