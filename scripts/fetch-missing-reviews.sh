#!/bin/bash
#
# Fetch Missing Reviews - Loop tot alles verwerkt is
#
# Features:
# - Herstart automatisch bij crashes
# - Pauze tussen runs om API niet te overbelasten
# - Stopt automatisch als alles klaar is
# - Toont statistieken
#

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

PAUSE_BETWEEN_RUNS=60  # 60 seconden pauze tussen runs
MAX_CONSECUTIVE_ERRORS=5

echo "🔍 Missing Reviews Fetcher - Continuous Mode"
echo "============================================="
echo ""
echo "📁 Project: $PROJECT_DIR"
echo "⏱️  Pauze tussen runs: ${PAUSE_BETWEEN_RUNS}s"
echo ""
echo "Druk Ctrl+C om te stoppen (voortgang wordt opgeslagen)"
echo ""

RUN_COUNT=0
ERROR_COUNT=0

while true; do
  RUN_COUNT=$((RUN_COUNT + 1))

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🚀 Run #$RUN_COUNT - $(date '+%Y-%m-%d %H:%M:%S')"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""

  # Run the TypeScript script
  npx tsx scripts/fetch-missing-reviews.ts
  EXIT_CODE=$?

  # Check exit code
  if [ $EXIT_CODE -eq 0 ]; then
    ERROR_COUNT=0

    # Check if we're done (script outputs "Alles is al verwerkt!")
    LAST_OUTPUT=$(npx tsx scripts/fetch-missing-reviews.ts --dry-run 2>&1 | grep "Nog te verwerken")
    REMAINING=$(echo "$LAST_OUTPUT" | grep -oP '\d+' | tail -1)

    if [ "$REMAINING" = "0" ] || [ -z "$REMAINING" ]; then
      echo ""
      echo "============================================="
      echo "🎉 KLAAR! Alle reviews zijn opgehaald!"
      echo "============================================="

      # Final stats
      REVIEW_FILES=$(find data/reviews -name "*.json" 2>/dev/null | wc -l)
      echo ""
      echo "📊 Eindresultaat:"
      echo "   Reviews bestanden: $REVIEW_FILES"
      echo "   Totaal runs: $RUN_COUNT"
      echo ""
      exit 0
    fi

    echo ""
    echo "📊 Nog te verwerken: $REMAINING locaties"

  else
    ERROR_COUNT=$((ERROR_COUNT + 1))
    echo ""
    echo "⚠️  Run gefaald (exit code: $EXIT_CODE)"
    echo "   Consecutive errors: $ERROR_COUNT/$MAX_CONSECUTIVE_ERRORS"

    if [ $ERROR_COUNT -ge $MAX_CONSECUTIVE_ERRORS ]; then
      echo ""
      echo "❌ Te veel opeenvolgende fouten. Gestopt."
      echo "   Controleer de logs en probeer later opnieuw."
      exit 1
    fi

    # Longer pause after error
    echo "   Wacht 2 minuten voor volgende poging..."
    sleep 120
    continue
  fi

  echo ""
  echo "⏳ Pauze van ${PAUSE_BETWEEN_RUNS}s..."
  sleep $PAUSE_BETWEEN_RUNS
done
