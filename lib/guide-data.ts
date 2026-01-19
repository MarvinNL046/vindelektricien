// Guide data types and loading functions for SEO pillar pages

// ===== INTERFACES =====

export interface FAQ {
  question: string;
  answer: string;
}

export interface GuideSection {
  id: string;
  title: string;
  content: string;
  subsections?: {
    title: string;
    content: string;
  }[];
}

export interface PillarGuide {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  introduction: string;
  sections: GuideSection[];
  faqs: FAQ[];
  relatedGuides: string[];
  lastUpdated?: string;
  author?: string;
}

export interface GuideCard {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

// ===== GUIDE CARDS DATA =====

export const pillarGuideCards: GuideCard[] = [
  {
    slug: 'elektricien-kiezen',
    title: 'Elektricien Kiezen',
    description: 'Tips en advies voor het kiezen van de juiste elektricien voor uw klus.',
    icon: 'building',
    color: 'yellow',
  },
  {
    slug: 'kosten-tarieven',
    title: 'Kosten & Tarieven',
    description: 'Overzicht van tarieven en wat u kunt verwachten aan kosten voor elektrische werkzaamheden.',
    icon: 'star',
    color: 'navy',
  },
  {
    slug: 'certificeringen',
    title: 'Certificeringen & Keurmerken',
    description: 'Uitleg over Erkend, VCA, NEN-keuringen en andere belangrijke certificeringen.',
    icon: 'clipboard',
    color: 'yellow',
  },
  {
    slug: 'storingen-oplossen',
    title: 'Storingen Oplossen',
    description: 'Wat te doen bij stroomuitval, kortsluiting of andere elektrische problemen.',
    icon: 'zap',
    color: 'navy',
  },
  {
    slug: 'verduurzamen',
    title: 'Verduurzamen',
    description: 'Informatie over zonnepanelen, laadpalen en andere duurzame oplossingen.',
    icon: 'sun',
    color: 'yellow',
  },
];

// ===== PILLAR GUIDE CONTENT =====

export const pillarGuides: Record<string, PillarGuide> = {
  'elektricien-kiezen': {
    slug: 'elektricien-kiezen',
    title: 'De Juiste Elektricien Kiezen',
    seoTitle: 'Elektricien Kiezen: Tips & Advies | VindElektricien.nl',
    seoDescription: 'Ontdek hoe u de juiste elektricien kiest. Tips over certificeringen, offertes vergelijken, betrouwbaarheid en waar u op moet letten.',
    introduction: 'Het kiezen van de juiste elektricien is essentieel voor veilig en vakkundig elektrawerk. Of u nu een kleine reparatie nodig heeft of een complete installatie, deze gids helpt u de beste keuze te maken.',
    sections: [],
    faqs: [
      {
        question: 'Waar moet ik op letten bij het kiezen van een elektricien?',
        answer: 'Let op certificeringen (Erkend, VCA), vraag naar referenties, vergelijk meerdere offertes en controleer of de elektricien verzekerd is. Check ook reviews en vraag naar garantie op het werk.',
      },
      {
        question: 'Moet een elektricien gecertificeerd zijn?',
        answer: 'Voor bepaalde werkzaamheden zoals aansluiting op het elektriciteitsnet moet een elektricien geregistreerd zijn. Kijk naar certificeringen zoals Erkend installateur, VCA en NEN-keuringen.',
      },
      {
        question: 'Hoeveel offertes moet ik aanvragen?',
        answer: 'Het is verstandig om minimaal 3 offertes aan te vragen om prijzen en werkwijzen te kunnen vergelijken. Let niet alleen op prijs, maar ook op kwaliteit en service.',
      },
    ],
    relatedGuides: ['kosten-tarieven', 'certificeringen'],
    lastUpdated: '2025-01-18',
    author: 'VindElektricien.nl Redactie',
  },
  'kosten-tarieven': {
    slug: 'kosten-tarieven',
    title: 'Kosten & Tarieven Elektricien',
    seoTitle: 'Wat Kost een Elektricien? Tarieven & Prijzen | VindElektricien.nl',
    seoDescription: 'Overzicht van tarieven voor elektriciens in Nederland. Van voorrijkosten tot uurtarieven en vaste prijzen voor veelvoorkomende klussen.',
    introduction: 'De kosten voor een elektricien varieren per type werk en regio. Deze gids geeft u inzicht in wat u kunt verwachten aan kosten voor verschillende elektrische werkzaamheden.',
    sections: [],
    faqs: [
      {
        question: 'Wat kost een elektricien per uur?',
        answer: 'Uurtarieven varieren doorgaans van 45 tot 75 euro per uur, exclusief BTW. Voor spoedwerk en avond/weekend werk gelden hogere tarieven.',
      },
      {
        question: 'Zijn er voorrijkosten?',
        answer: 'De meeste elektriciens rekenen voorrijkosten tussen de 25 en 50 euro. Vraag dit altijd vooraf na bij het aanvragen van een offerte.',
      },
      {
        question: 'Wat kost het vervangen van een meterkast?',
        answer: 'Een nieuwe meterkast kost gemiddeld tussen de 800 en 1.500 euro, afhankelijk van het aantal groepen en eventuele extra werkzaamheden.',
      },
    ],
    relatedGuides: ['elektricien-kiezen', 'certificeringen'],
    lastUpdated: '2025-01-18',
    author: 'VindElektricien.nl Redactie',
  },
  'certificeringen': {
    slug: 'certificeringen',
    title: 'Certificeringen & Keurmerken',
    seoTitle: 'Certificeringen Elektricien: Erkend, VCA, NEN | VindElektricien.nl',
    seoDescription: 'Alles over certificeringen voor elektriciens. Wat betekenen Erkend, VCA, NEN-keuringen en waarom zijn ze belangrijk?',
    introduction: 'Certificeringen en keurmerken geven zekerheid over de kwaliteit en betrouwbaarheid van een elektricien. Leer wat de belangrijkste certificeringen betekenen.',
    sections: [],
    faqs: [
      {
        question: 'Wat betekent Erkend installateur?',
        answer: 'Een Erkend installateur is gecertificeerd om werkzaamheden uit te voeren die aan het elektriciteitsnet worden aangesloten. Dit is verplicht voor bepaalde installaties.',
      },
      {
        question: 'Wat is VCA-certificering?',
        answer: 'VCA staat voor Veiligheid, Gezondheid en Milieu Checklist Aannemers. Het is een certificaat dat aantoont dat een bedrijf veilig werkt.',
      },
      {
        question: 'Wanneer is een NEN-keuring nodig?',
        answer: 'NEN-keuringen zijn verplicht bij oplevering van nieuwe installaties en periodiek voor bedrijfsinstallaties. Het controleert of de installatie voldoet aan de normen.',
      },
    ],
    relatedGuides: ['elektricien-kiezen', 'kosten-tarieven'],
    lastUpdated: '2025-01-18',
    author: 'VindElektricien.nl Redactie',
  },
  'storingen-oplossen': {
    slug: 'storingen-oplossen',
    title: 'Elektrische Storingen Oplossen',
    seoTitle: 'Stroomstoring? Wat te Doen bij Elektra Problemen | VindElektricien.nl',
    seoDescription: 'Hulp bij elektrische storingen. Wat te doen bij stroomuitval, kortsluiting of als de aardlekschakelaar uitslaat. Tips en advies.',
    introduction: 'Elektrische storingen kunnen onverwacht optreden en voor overlast zorgen. Deze gids helpt u te begrijpen wat u zelf kunt doen en wanneer u een elektricien moet inschakelen.',
    sections: [],
    faqs: [
      {
        question: 'Wat moet ik doen als de stroom uitvalt?',
        answer: 'Controleer eerst of het een algemene stroomstoring is of alleen bij u. Check de meterkast op uitgevallen groepen of aardlekschakelaar. Schakel geen elektricien in voor een algemene storing.',
      },
      {
        question: 'De aardlekschakelaar slaat steeds uit, wat nu?',
        answer: 'Dit wijst op een aardlek in uw installatie of een aangesloten apparaat. Schakel apparaten een voor een uit om de oorzaak te vinden. Blijft het probleem, schakel dan een elektricien in.',
      },
      {
        question: 'Wanneer is een storing spoed?',
        answer: 'Spoedsituaties zijn: brandlucht uit stopcontact, vonken of rook, water bij elektrische installatie, of volledige stroomuitval die niet te verhelpen is.',
      },
    ],
    relatedGuides: ['elektricien-kiezen', 'kosten-tarieven'],
    lastUpdated: '2025-01-18',
    author: 'VindElektricien.nl Redactie',
  },
  'verduurzamen': {
    slug: 'verduurzamen',
    title: 'Verduurzamen met Elektra',
    seoTitle: 'Verduurzamen: Zonnepanelen, Laadpaal & Meer | VindElektricien.nl',
    seoDescription: 'Informatie over elektrische verduurzaming. Zonnepanelen, thuisbatterij, laadpaal installatie en slimme energieoplossingen.',
    introduction: 'Steeds meer mensen willen hun woning verduurzamen. Van zonnepanelen tot laadpalen, een goede elektricien helpt u de juiste keuzes te maken.',
    sections: [],
    faqs: [
      {
        question: 'Wat kost een laadpaal installeren?',
        answer: 'De kosten voor een laadpaal varieren van 1.000 tot 2.500 euro inclusief installatie, afhankelijk van het type laadpaal en eventuele aanpassingen aan de meterkast.',
      },
      {
        question: 'Moet mijn meterkast aangepast worden voor zonnepanelen?',
        answer: 'Vaak wel. Voor zonnepanelen is meestal uitbreiding van de groepenkast nodig en een extra aardlekschakelaar. Een elektricien kan dit beoordelen.',
      },
      {
        question: 'Wat is een thuisbatterij?',
        answer: 'Een thuisbatterij slaat zelf opgewekte stroom op voor later gebruik. Dit is interessant als u zonnepanelen heeft en de salderingsregeling wordt afgebouwd.',
      },
    ],
    relatedGuides: ['elektricien-kiezen', 'kosten-tarieven'],
    lastUpdated: '2025-01-18',
    author: 'VindElektricien.nl Redactie',
  },
};

// ===== DATA LOADING FUNCTIONS =====

/**
 * Get all pillar guide cards for the index page
 */
export function getAllGuideCards(): GuideCard[] {
  return pillarGuideCards;
}

/**
 * Get a specific pillar guide by slug
 */
export function getGuideBySlug(slug: string): PillarGuide | null {
  return pillarGuides[slug] || null;
}

/**
 * Get all pillar guide slugs for static generation
 */
export function getAllGuideSlugs(): string[] {
  return Object.keys(pillarGuides);
}

/**
 * Get related guides for a specific guide
 */
export function getRelatedGuides(slug: string): GuideCard[] {
  const guide = pillarGuides[slug];
  if (!guide) return [];

  return guide.relatedGuides
    .map(relatedSlug => pillarGuideCards.find(card => card.slug === relatedSlug))
    .filter((card): card is GuideCard => card !== undefined);
}

/**
 * Get guide card by slug
 */
export function getGuideCardBySlug(slug: string): GuideCard | null {
  return pillarGuideCards.find(card => card.slug === slug) || null;
}

// ===== AUTHOR INFO =====

export const GUIDE_AUTHOR = {
  name: 'VindElektricien.nl Redactie',
  description: 'Onze redactie bestaat uit elektra-experts en ervaren vakmensen die betrouwbare informatie bieden over elektrische installaties en het vinden van de juiste elektricien.',
  expertise: ['Elektrische Installaties', 'Storingen & Reparaties', 'Verduurzaming', 'Veiligheid'],
};
