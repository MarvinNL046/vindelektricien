# Elektricien Data Filtering Documentatie

## Overzicht
Dit document beschrijft het filterproces om te verzekeren dat alleen echte elektriciens en installatiebedrijven in de dataset worden opgenomen.

## Probleem
De originele dataset kan bedrijven bevatten die geen elektriciens zijn:
- Algemene aannemers zonder elektra-specialisatie
- Bouwbedrijven
- Klussenbedrijven zonder elektra-focus

## Oplossing
We implementeren een filtersysteem dat:
1. Niet-elektriciens identificeert en uitsluit
2. Echte elektriciens en installatiebedrijven bewaart
3. Bedrijven met relevante certificeringen includeert

## Filterregels

### Uitgesloten Bedrijfstypes
- Algemene aannemers
- Schilders
- Loodgieters (tenzij ook elektricien)
- Hoveniers

### Geincludeerde Bedrijfstypes
- Elektricien
- Elektrotechnisch installatiebedrijf
- Elektrische installateur
- Installatiebedrijf (met elektra-diensten)

### Speciale Behandeling
- **Gecombineerde Installateurs**: Bedrijven die zowel elektra als andere diensten leveren worden opgenomen
- **Certificeringen**: Bedrijven met Erkend, VCA of NEN-certificering worden opgenomen

## Implementatie

### Filter Script
`scripts/filter-facilities.ts` - Kan onafhankelijk worden uitgevoerd

### Gebruik
```bash
# Filter uitvoeren
npx tsx scripts/filter-facilities.ts

# Data verwerken met filtering
npx tsx scripts/process-all-data.ts

# Productie data bouwen
npm run build-data
```

## Bestanden
- `data/elektriciens-filtered.json` - Gefilterde data
- `data/removed-entries.json` - Verwijderde entries ter controle
- `public/data/elektriciens.json` - Productie data

## Onderhoud
Om filterregels bij te werken:
1. Bewerk de keyword arrays in de filterfuncties
2. Test met voorbeelddata
3. Controleer `removed-entries.json`
4. Update deze documentatie
