import { getProvinceLink, getServiceTypeLink } from './blog-data';

interface BlogContent {
  [key: string]: string;
}

export const blogContent: BlogContent = {
  'wanneer-meterkast-vervangen': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Een meterkast is het hart van uw elektrische installatie. Maar hoe weet u wanneer het tijd is voor vervanging?
        In dit artikel bespreken we de belangrijkste signalen en uitleggen we waarom een moderne groepenkast essentieel is voor uw veiligheid.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Signalen dat uw Meterkast Toe is aan Vervanging</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Let op deze waarschuwingssignalen:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-yellow-600 mr-2">•</span>
              <span>Stoppen in plaats van automaten</span>
            </li>
            <li class="flex items-start">
              <span class="text-yellow-600 mr-2">•</span>
              <span>Regelmatig uitvallende groepen</span>
            </li>
            <li class="flex items-start">
              <span class="text-yellow-600 mr-2">•</span>
              <span>Geen of slechts een aardlekschakelaar</span>
            </li>
            <li class="flex items-start">
              <span class="text-yellow-600 mr-2">•</span>
              <span>Zichtbare schade of verkleuring</span>
            </li>
            <li class="flex items-start">
              <span class="text-yellow-600 mr-2">•</span>
              <span>Meterkast ouder dan 30 jaar</span>
            </li>
          </ul>
        </div>

        <div class="bg-yellow-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Kosten Meterkast Vervangen</h2>
          <p class="text-gray-700 mb-4">
            De kosten voor een nieuwe meterkast varieren van 800 tot 1.500 euro, afhankelijk van het aantal groepen en
            de complexiteit van de installatie. <a href="${getServiceTypeLink('meterkast')}" class="text-yellow-600 hover:text-yellow-800 underline">Vind een elektricien</a> voor een vrijblijvende offerte.
          </p>
        </div>
      </section>
    </div>
  `,

  'laadpaal-thuis-installeren': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Steeds meer Nederlanders rijden elektrisch. Een laadpaal thuis maakt het laden gemakkelijk en vaak goedkoper
        dan bij openbare laadpunten. Lees hier alles over het installeren van een laadpaal.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Wat Komt er Kijken bij Laadpaal Installatie?</h2>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">1. Keuze van de Laadpaal</h3>
              <p class="text-gray-700">
                Er zijn verschillende merken en types laadpalen: Alfen, EVBox, Wallbox, en meer. Let op het laadvermogen (7.4 kW of 11 kW) en slimme functies.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">2. Aanpassing Groepenkast</h3>
              <p class="text-gray-700">
                Vaak is uitbreiding van de <a href="${getServiceTypeLink('meterkast')}" class="text-yellow-600 hover:text-yellow-800 underline">groepenkast</a> nodig met een aparte groep en aardlekschakelaar voor de laadpaal.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">3. Bekabeling</h3>
              <p class="text-gray-700">
                De afstand van de meterkast naar de laadpaal bepaalt de hoeveelheid kabel die nodig is en daarmee mede de kosten.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">4. Certificering</h3>
              <p class="text-gray-700">
                Een erkend installateur zorgt voor correcte installatie en kan subsidie aanvragen indien van toepassing.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Kosten Laadpaal Installatie</h2>
          <p class="text-gray-700">
            Reken op 1.000 tot 2.500 euro all-in, afhankelijk van de laadpaal en benodigde aanpassingen.
            Vraag meerdere <a href="${getServiceTypeLink('laadpaal')}" class="text-yellow-600 hover:text-yellow-800 underline">offertes aan bij laadpaal installateurs</a>.
          </p>
        </div>
      </section>
    </div>
  `,

  'stroomstoring-wat-te-doen': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Ineens geen stroom? Dat is vervelend, maar niet altijd reden voor paniek. Vaak kunt u het probleem zelf oplossen.
        Lees hier wat u moet doen bij een stroomstoring.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Stap-voor-stap bij Stroomuitval</h2>

          <div class="space-y-4">
            <div class="border-l-4 border-yellow-400 pl-4">
              <h3 class="font-semibold text-gray-900">Stap 1: Check de buurt</h3>
              <p class="text-gray-700 text-sm">Kijk of uw buren ook geen stroom hebben. Is het een algemene storing? Bel dan de netbeheerder, niet een elektricien.</p>
            </div>
            <div class="border-l-4 border-yellow-400 pl-4">
              <h3 class="font-semibold text-gray-900">Stap 2: Controleer de meterkast</h3>
              <p class="text-gray-700 text-sm">Kijk of er groepen of de aardlekschakelaar zijn uitgevallen. Zet deze voorzichtig terug.</p>
            </div>
            <div class="border-l-4 border-yellow-400 pl-4">
              <h3 class="font-semibold text-gray-900">Stap 3: Sluit apparaten uit</h3>
              <p class="text-gray-700 text-sm">Valt de schakelaar opnieuw uit? Haal apparaten van de groep en probeer opnieuw om de oorzaak te vinden.</p>
            </div>
          </div>
        </div>

        <div class="bg-red-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Wanneer Direct een Elektricien Bellen?</h2>
          <ul class="space-y-2 text-gray-700">
            <li>• Brandlucht of rook uit stopcontact of meterkast</li>
            <li>• Vonken of geschroeide plekken</li>
            <li>• Water in de buurt van de installatie</li>
            <li>• Storing die u niet kunt verhelpen</li>
          </ul>
          <p class="text-gray-700 mt-4">
            <a href="${getServiceTypeLink('storingen')}" class="text-yellow-600 hover:text-yellow-800 underline">Vind een elektricien voor spoedhulp</a>.
          </p>
        </div>
      </section>
    </div>
  `,

  'aardlekschakelaar-slaat-uit': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        De aardlekschakelaar is een belangrijke veiligheidsmaatregel die u beschermt tegen elektrische schokken.
        Maar wat als deze regelmatig uitslaat? Lees hier over de oorzaken en oplossingen.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Veelvoorkomende Oorzaken</h2>
          <ul class="space-y-3 text-gray-700">
            <li class="flex items-start">
              <span class="text-yellow-600 mr-2 font-bold">1.</span>
              <span><strong>Defect apparaat</strong> - Een apparaat met een aardlek kan de schakelaar laten uitslaan</span>
            </li>
            <li class="flex items-start">
              <span class="text-yellow-600 mr-2 font-bold">2.</span>
              <span><strong>Vocht</strong> - Vocht in stopcontacten of apparaten veroorzaakt vaak problemen</span>
            </li>
            <li class="flex items-start">
              <span class="text-yellow-600 mr-2 font-bold">3.</span>
              <span><strong>Beschadigde bedrading</strong> - Oude of beschadigde kabels kunnen lekstroom veroorzaken</span>
            </li>
            <li class="flex items-start">
              <span class="text-yellow-600 mr-2 font-bold">4.</span>
              <span><strong>Verouderde aardlekschakelaar</strong> - Ook de schakelaar zelf kan aan vervanging toe zijn</span>
            </li>
          </ul>
        </div>

        <div class="bg-yellow-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Zelf Oplossen</h2>
          <p class="text-gray-700 mb-4">
            Haal alle apparaten van het stopcontact en zet de aardlekschakelaar terug. Sluit daarna apparaten
            een voor een aan om de boosdoener te vinden.
          </p>
          <p class="text-gray-700">
            Blijft het probleem? Dan is het tijd voor een <a href="/" class="text-yellow-600 hover:text-yellow-800 underline">elektricien</a>
            die de installatie kan doorlichten.
          </p>
        </div>
      </section>
    </div>
  `,

  'elektricien-kiezen-tips': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Een goede elektricien vinden is essentieel voor veilig en vakkundig werk.
        Met deze 10 tips maakt u de juiste keuze.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">10 Tips voor het Kiezen</h2>
          <ol class="space-y-4 text-gray-700">
            <li><strong>1. Check certificeringen</strong> - Kijk naar Erkend, VCA of andere keurmerken</li>
            <li><strong>2. Vraag meerdere offertes</strong> - Vergelijk minimaal 3 offertes</li>
            <li><strong>3. Lees reviews</strong> - Bekijk ervaringen van andere klanten</li>
            <li><strong>4. Vraag naar garantie</strong> - Een goede elektricien geeft garantie op het werk</li>
            <li><strong>5. Controleer verzekering</strong> - De elektricien moet bedrijfsverzekerd zijn</li>
            <li><strong>6. Let op communicatie</strong> - Reageert de elektricien snel en duidelijk?</li>
            <li><strong>7. Vraag referenties</strong> - Vraag naar eerdere projecten</li>
            <li><strong>8. Bespreek de planning</strong> - Wanneer kan het werk uitgevoerd worden?</li>
            <li><strong>9. Begrijp de offerte</strong> - Zijn alle kosten helder omschreven?</li>
            <li><strong>10. Vertrouw uw gevoel</strong> - Voelt het contact professioneel?</li>
          </ol>
        </div>

        <div class="bg-yellow-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Start uw Zoektocht</h2>
          <p class="text-gray-700">
            Vind elektriciens in uw regio via <a href="/" class="text-yellow-600 hover:text-yellow-800 underline">VindElektricien.nl</a>.
            Zoek in <a href="${getProvinceLink('noord-holland')}" class="text-yellow-600 hover:text-yellow-800 underline">Noord-Holland</a>,
            <a href="${getProvinceLink('zuid-holland')}" class="text-yellow-600 hover:text-yellow-800 underline">Zuid-Holland</a>
            of een andere provincie.
          </p>
        </div>
      </section>
    </div>
  `,

  'kosten-elektricien-overzicht': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Wat kost een elektricien eigenlijk? De tarieven kunnen per bedrijf en regio verschillen.
        Dit overzicht geeft u een helder beeld van de kosten.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Tariefoverzicht</h2>
          <div class="space-y-3 text-gray-700">
            <p><strong>Uurtarief:</strong> 45 - 75 euro (excl. BTW)</p>
            <p><strong>Voorrijkosten:</strong> 25 - 50 euro</p>
            <p><strong>Spoedtarief:</strong> 1,5x - 2x normaal tarief</p>
            <p><strong>Avond/weekend:</strong> +25% - 50%</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Richtprijzen Klussen</h2>
          <div class="space-y-3 text-gray-700">
            <p><strong>Stopcontact bijplaatsen:</strong> 75 - 150 euro</p>
            <p><strong>Schakelaar vervangen:</strong> 50 - 100 euro</p>
            <p><strong>Meterkast vervangen:</strong> 800 - 1.500 euro</p>
            <p><strong>Laadpaal installeren:</strong> 1.000 - 2.500 euro</p>
            <p><strong>Storingsdienst (spoed):</strong> 150 - 300 euro</p>
          </div>
        </div>

        <div class="bg-yellow-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Offerte Aanvragen</h2>
          <p class="text-gray-700">
            Vraag altijd een gespecificeerde offerte aan. Zo weet u precies waar u aan toe bent.
            <a href="/" class="text-yellow-600 hover:text-yellow-800 underline">Vind een elektricien</a> in uw buurt.
          </p>
        </div>
      </section>
    </div>
  `,
};

export function getBlogContent(slug: string): string | undefined {
  return blogContent[slug];
}
