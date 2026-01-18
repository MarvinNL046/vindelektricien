import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

// Simple translation mapping for common phrases
const translations: Record<string, string> = {
  'Beautiful': 'Prachtig',
  'beautiful': 'prachtig',
  'Catholic church': 'katholieke kerk',
  'church': 'kerk',
  'Church': 'Kerk',
  'in the heart of': 'in het hart van',
  'Farewell to my aunt this time': 'Dit keer afscheid van mijn tante',
  'Personally, I love': 'Persoonlijk hou ik van',
  'Gregorian music': 'Gregoriaanse muziek',
  'For me, a sung High Mass is a celebration': 'Voor mij is een gezongen Hoogmis een feest',
  'Despite the choir consisting primarily of older men and women': 'Ondanks dat het koor voornamelijk uit oudere mannen en vrouwen bestaat',
  "it's always wonderful to listen to them": 'is het altijd heerlijk om naar hen te luisteren',
  'The church has a great atmosphere': 'De kerk heeft een geweldige sfeer',
  'and the choir looks': 'en het koor ziet er',
  'with good and bad memories': 'met goede en slechte herinneringen',
  'it remains the church from the village where my heart still lies': 'het blijft de kerk van het dorp waar mijn hart nog steeds ligt',
  'Old chapel': 'Oude kapel',
  'Surrounding it is a kind of platform with various types of stones': 'Eromheen ligt een soort platform met verschillende soorten stenen',
  'Their meaning or explanation is in a covered tube on the platform itself': 'Hun betekenis of uitleg staat in een afgesloten koker op het platform zelf',
  'Beautiful chapel in a beautiful setting': 'Prachtige kapel in een prachtige omgeving',
  'quietly situated with a bench': 'rustig gelegen met een bankje',
  "If you've already found the chapel, that's a bonus": 'Als je de kapel al hebt gevonden, is dat een bonus',
  'What a wonderful place to discover': 'Wat een heerlijke plek om te ontdekken',
  'How peaceful': 'Wat een rust',
  'Please be considerate of the local residents': 'Houd alstublieft rekening met de lokale bewoners',
  "and don't disturb their peace with your car or motorcycle": 'en verstoor hun rust niet met uw auto of motor',
  "It's one of the most beautiful spots in Limburg": 'Het is een van de mooiste plekjes in Limburg',
  'Limburg at its finest': 'Limburg op zijn best',
  'A gem for art and culture lovers': 'Een juweel voor kunst- en cultuurliefhebbers',
  'Works (including windows and ceiling paintings) by renowned (Limburg) artists': 'Werken (waaronder ramen en plafondschilderingen) van gerenommeerde (Limburgse) kunstenaars',
  'Regular concerts are also held': 'Er worden ook regelmatig concerten gehouden',
  'see the church/art society website': 'zie de website van de kerk/kunstvereniging',
  'Beautiful church with lots of art': 'Prachtige kerk met veel kunst',
  "Today I'm invited to an exhibition": 'Vandaag ben ik uitgenodigd voor een tentoonstelling',
  'by artists/lovers of art and the church': 'door kunstenaars/liefhebbers van kunst en de kerk',
  'Pictures with a Meaning': 'Beelden met een Betekenis',
  'Among other things': 'Onder andere',
  'a friend of mine': 'een vriendin van mij',
  'has exhibited her embroidery, bronze, and painted pictures for viewing': 'heeft haar borduurwerk, bronzen en geschilderde werken tentoongesteld',
};

async function translateReviews() {
  // Get all English reviews
  const reviews = await sql`
    SELECT id, content, language FROM google_reviews 
    WHERE language = 'nl' OR language IS NULL
  `;
  
  console.log(`Found ${reviews.length} reviews to check`);
  
  let translated = 0;
  
  for (const review of reviews) {
    let content = review.content;
    if (!content) continue;
    
    // Check if content looks English (contains common English words)
    const englishIndicators = ['the', 'and', 'with', 'for', 'this', 'that', 'have', 'has', 'was', 'were', 'been', 'being', 'Beautiful', 'church', 'Church'];
    const looksEnglish = englishIndicators.some(word => 
      content.includes(` ${word} `) || content.startsWith(`${word} `) || content.includes(` ${word}.`)
    );
    
    if (!looksEnglish) continue;
    
    // Apply translations
    let translatedContent = content;
    for (const [eng, nl] of Object.entries(translations)) {
      translatedContent = translatedContent.replace(new RegExp(eng, 'g'), nl);
    }
    
    // Only update if something changed
    if (translatedContent !== content) {
      await sql`
        UPDATE google_reviews 
        SET content = ${translatedContent}, language = 'nl-translated'
        WHERE id = ${review.id}
      `;
      translated++;
      console.log(`Translated review ${review.id}`);
    }
  }
  
  console.log(`\nTranslated ${translated} reviews`);
}

translateReviews().catch(console.error);
