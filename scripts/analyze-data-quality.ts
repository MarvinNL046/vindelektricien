import * as fs from 'fs/promises';
import * as path from 'path';
import chalk from 'chalk';

interface Facility {
  name: string;
  city: string;
  state: string;
  state_abbr: string;
  county: string;
  slug: string;
  facility_types: string[];
  treatment_types: string[];
  website?: string;
  phone?: string;
  address?: string;
}

async function analyzeDataQuality() {
  console.log(chalk.bold.blue('\n🔍 Facility Data Quality Analysis\n'));

  // Load data
  const dataFile = path.join(__dirname, '..', 'public', 'data', 'facilities.json');
  let facilities: Facility[];

  try {
    facilities = JSON.parse(await fs.readFile(dataFile, 'utf-8'));
  } catch (error) {
    console.error(chalk.red('❌ Could not load facilities.json'));
    process.exit(1);
  }

  console.log(chalk.cyan(`Total entries: ${facilities.length}`));

  // Analyze generic names
  const genericNames = ['rehab', 'treatment center', 'recovery center', 'rehabilitation'];
  const genericEntries = facilities.filter(f =>
    genericNames.some(g => f.name.toLowerCase().trim() === g)
  );

  console.log(chalk.yellow(`\n📊 Generic name entries: ${genericEntries.length}`));
  if (genericEntries.length > 0) {
    console.log(chalk.gray('\nGeneric entries by city:'));
    genericEntries.forEach(entry => {
      console.log(chalk.gray(`  - "${entry.name}" in ${entry.city}, ${entry.state}`));
    });
  }

  // Analyze suspicious patterns
  console.log(chalk.yellow('\n🚨 Suspicious patterns:'));

  // Entries without proper names
  const shortNames = facilities.filter(f => f.name.length < 5);
  console.log(chalk.gray(`\nVery short names (< 5 chars): ${shortNames.length}`));
  shortNames.slice(0, 10).forEach(entry => {
    console.log(chalk.gray(`  - "${entry.name}" in ${entry.city}, ${entry.state}`));
  });

  // Entries missing key data
  const missingPhone = facilities.filter(f => !f.phone);
  const missingAddress = facilities.filter(f => !f.address);
  const missingWebsite = facilities.filter(f => !f.website);

  console.log(chalk.gray(`\nMissing phone: ${missingPhone.length}`));
  console.log(chalk.gray(`Missing address: ${missingAddress.length}`));
  console.log(chalk.gray(`Missing website: ${missingWebsite.length}`));

  // Analyze duplicates
  const nameStatePairs = facilities.map(f => `${f.name}|${f.city}|${f.state}`);
  const duplicates = nameStatePairs.filter((item, index) => nameStatePairs.indexOf(item) !== index);
  console.log(chalk.gray(`\nDuplicate entries: ${duplicates.length}`));

  // State analysis
  console.log(chalk.cyan('\n📍 State distribution:'));
  const stateCounts: Record<string, number> = {};
  facilities.forEach(f => {
    stateCounts[f.state] = (stateCounts[f.state] || 0) + 1;
  });

  Object.entries(stateCounts)
    .sort(([, a], [, b]) => b - a)
    .forEach(([state, count]) => {
      console.log(chalk.gray(`  - ${state}: ${count} entries`));
    });

  // Facility type analysis
  console.log(chalk.cyan('\n🏥 Facility types:'));
  const typeCounts: Record<string, number> = {};
  facilities.forEach(f => {
    (f.facility_types || []).forEach(type => {
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
  });

  Object.entries(typeCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15)
    .forEach(([type, count]) => {
      console.log(chalk.gray(`  - ${type}: ${count} entries`));
    });

  // Treatment type analysis
  console.log(chalk.cyan('\n💊 Treatment types:'));
  const treatmentCounts: Record<string, number> = {};
  facilities.forEach(f => {
    (f.treatment_types || []).forEach(type => {
      treatmentCounts[type] = (treatmentCounts[type] || 0) + 1;
    });
  });

  Object.entries(treatmentCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15)
    .forEach(([type, count]) => {
      console.log(chalk.gray(`  - ${type}: ${count} entries`));
    });

  // Recommendations
  console.log(chalk.bold.green('\n✅ Recommendations:'));
  console.log('1. Filter out entries with generic names');
  console.log('2. Verify state assignments for edge cases');
  console.log('3. Remove or merge duplicate entries');
  console.log(`4. Consider removing ${genericEntries.length} generic entries before enrichment`);
  console.log(`5. Enrich ${missingPhone.length} entries missing phone numbers`);
  console.log(`6. Enrich ${missingWebsite.length} entries missing websites`);

  // Export problematic entries
  const problematicEntries = {
    genericNames: genericEntries,
    shortNames: shortNames.slice(0, 20),
    missingData: {
      phone: missingPhone.length,
      address: missingAddress.length,
      website: missingWebsite.length,
    },
    totalEntries: facilities.length,
    cleanEntries: facilities.length - genericEntries.length
  };

  const outputFile = path.join(__dirname, '..', 'data', 'data-quality-report.json');
  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, JSON.stringify(problematicEntries, null, 2));

  console.log(chalk.magenta(`\n📄 Full report saved to: ${outputFile}`));
}

analyzeDataQuality().catch(console.error);
