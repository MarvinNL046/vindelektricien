export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'wanneer-meterkast-vervangen',
    title: 'Wanneer Moet Uw Meterkast Vervangen Worden?',
    excerpt: 'Ontdek de signalen dat uw meterkast aan vervanging toe is en waarom een moderne groepenkast belangrijk is voor uw veiligheid.',
    author: 'VindElektricien.nl Redactie',
    date: '2025-01-15',
    readTime: '6 min',
    category: 'Installatie',
    image: '/images/blog/meterkast-vervangen.jpg',
  },
  {
    id: 2,
    slug: 'laadpaal-thuis-installeren',
    title: 'Laadpaal Thuis Installeren: Alles Wat U Moet Weten',
    excerpt: 'Een complete gids over het installeren van een laadpaal voor uw elektrische auto, van keuze tot installatie.',
    author: 'VindElektricien.nl Redactie',
    date: '2025-01-10',
    readTime: '8 min',
    category: 'Verduurzaming',
    image: '/images/blog/laadpaal-installeren.jpg',
  },
  {
    id: 3,
    slug: 'stroomstoring-wat-te-doen',
    title: 'Stroomstoring: Wat te Doen en Wanneer Bellen',
    excerpt: 'Praktische tips voor als de stroom uitvalt. Wanneer lost u het zelf op en wanneer belt u een elektricien?',
    author: 'VindElektricien.nl Redactie',
    date: '2025-01-05',
    readTime: '5 min',
    category: 'Storingen',
    image: '/images/blog/stroomstoring.jpg',
  },
  {
    id: 4,
    slug: 'zonnepanelen-aansluiten-groepenkast',
    title: 'Zonnepanelen Aansluiten op de Groepenkast',
    excerpt: 'Wat komt er kijken bij het aansluiten van zonnepanelen op uw elektrische installatie? Een overzicht.',
    author: 'VindElektricien.nl Redactie',
    date: '2024-12-28',
    readTime: '7 min',
    category: 'Verduurzaming',
    image: '/images/blog/zonnepanelen-aansluiting.jpg',
  },
  {
    id: 5,
    slug: 'elektricien-kiezen-tips',
    title: '10 Tips voor het Kiezen van de Juiste Elektricien',
    excerpt: 'Hoe vindt u een betrouwbare elektricien? Deze tips helpen u de juiste keuze te maken.',
    author: 'VindElektricien.nl Redactie',
    date: '2024-12-20',
    readTime: '6 min',
    category: 'Tips',
    image: '/images/blog/elektricien-kiezen.jpg',
  },
  {
    id: 6,
    slug: 'kosten-elektricien-overzicht',
    title: 'Wat Kost een Elektricien? Compleet Tariefoverzicht',
    excerpt: 'Een helder overzicht van uurtarieven, voorrijkosten en vaste prijzen voor veel voorkomende werkzaamheden.',
    author: 'VindElektricien.nl Redactie',
    date: '2024-12-15',
    readTime: '7 min',
    category: 'Kosten',
    image: '/images/blog/kosten-elektricien.jpg',
  },
  {
    id: 7,
    slug: 'aardlekschakelaar-slaat-uit',
    title: 'Aardlekschakelaar Slaat Uit: Oorzaken en Oplossingen',
    excerpt: 'Waarom slaat uw aardlekschakelaar uit en wat kunt u doen om het probleem te verhelpen?',
    author: 'VindElektricien.nl Redactie',
    date: '2025-01-20',
    readTime: '5 min',
    category: 'Storingen',
    image: '/images/blog/aardlekschakelaar.jpg',
  },
  {
    id: 8,
    slug: 'smart-home-elektrische-installatie',
    title: 'Smart Home: Uw Elektrische Installatie Slim Maken',
    excerpt: 'Ontdek de mogelijkheden van domotica en wat uw elektricien kan doen om uw huis slimmer te maken.',
    author: 'VindElektricien.nl Redactie',
    date: '2025-01-18',
    readTime: '8 min',
    category: 'Innovatie',
    image: '/images/blog/smart-home.jpg',
  },
  {
    id: 9,
    slug: 'nen-keuring-elektrische-installatie',
    title: 'NEN-keuring: Wanneer en Waarom is het Verplicht?',
    excerpt: 'Alles over de NEN 1010 en NEN 3140 keuringen voor uw elektrische installatie.',
    author: 'VindElektricien.nl Redactie',
    date: '2025-01-16',
    readTime: '6 min',
    category: 'Keuring',
    image: '/images/blog/nen-keuring.jpg',
  },
  {
    id: 10,
    slug: 'stopcontacten-bijplaatsen',
    title: 'Stopcontacten Bijplaatsen: Kosten en Mogelijkheden',
    excerpt: 'Te weinig stopcontacten? Lees hier wat de mogelijkheden zijn en wat het kost.',
    author: 'VindElektricien.nl Redactie',
    date: '2025-01-14',
    readTime: '4 min',
    category: 'Installatie',
    image: '/images/blog/stopcontacten.jpg',
  },
  {
    id: 11,
    slug: 'elektrische-veiligheid-thuis',
    title: 'Elektrische Veiligheid Thuis: 8 Belangrijke Tips',
    excerpt: 'Voorkom brandgevaar en ongelukken met deze tips voor een veilige elektrische installatie.',
    author: 'VindElektricien.nl Redactie',
    date: '2025-01-12',
    readTime: '5 min',
    category: 'Veiligheid',
    image: '/images/blog/elektrische-veiligheid.jpg',
  },
  {
    id: 12,
    slug: 'verlichting-woning-tips',
    title: 'Verlichting in de Woning: Tips van Elektriciens',
    excerpt: 'Van LED-spots tot sfeerverlichting: tips voor de perfecte verlichting in elk vertrek.',
    author: 'VindElektricien.nl Redactie',
    date: '2025-01-08',
    readTime: '6 min',
    category: 'Tips',
    image: '/images/blog/verlichting-woning.jpg',
  },
  {
    id: 13,
    slug: 'elektra-bij-verbouwing',
    title: 'Elektra bij Verbouwing: Waar Moet U Rekening Mee Houden?',
    excerpt: 'Planning van uw elektrische installatie bij een verbouwing. Tips van professionals.',
    author: 'VindElektricien.nl Redactie',
    date: '2025-01-06',
    readTime: '7 min',
    category: 'Installatie',
    image: '/images/blog/elektra-verbouwing.jpg',
  },
  {
    id: 14,
    slug: 'thuisbatterij-zonnepanelen',
    title: 'Thuisbatterij voor Zonnepanelen: Is het de Moeite Waard?',
    excerpt: 'De voor- en nadelen van een thuisbatterij en wanneer het interessant is om aan te schaffen.',
    author: 'VindElektricien.nl Redactie',
    date: '2025-01-04',
    readTime: '7 min',
    category: 'Verduurzaming',
    image: '/images/blog/thuisbatterij.jpg',
  },
  {
    id: 15,
    slug: 'elektricien-voor-bedrijven',
    title: 'Elektricien voor Bedrijven: Waar Let U Op?',
    excerpt: 'Zakelijke klanten hebben andere eisen. Dit is waar u op moet letten bij het kiezen van een bedrijfselektricien.',
    author: 'VindElektricien.nl Redactie',
    date: '2025-01-02',
    readTime: '6 min',
    category: 'Zakelijk',
    image: '/images/blog/bedrijfselektricien.jpg',
  },
  {
    id: 16,
    slug: 'stoppen-vs-automaten',
    title: 'Stoppen vs Automaten: Waarom Overstappen?',
    excerpt: 'Heeft u nog oude stoppen? Lees waarom automaten veiliger zijn en wat de overstap kost.',
    author: 'VindElektricien.nl Redactie',
    date: '2024-12-30',
    readTime: '5 min',
    category: 'Veiligheid',
    image: '/images/blog/stoppen-automaten.jpg',
  },
  {
    id: 17,
    slug: 'buitenstopcontact-aanleggen',
    title: 'Buitenstopcontact Aanleggen: Wat U Moet Weten',
    excerpt: 'Een stopcontact buiten is handig voor tuingereedschap en verlichting. Dit zijn de mogelijkheden.',
    author: 'VindElektricien.nl Redactie',
    date: '2024-12-25',
    readTime: '4 min',
    category: 'Installatie',
    image: '/images/blog/buitenstopcontact.jpg',
  },
  {
    id: 18,
    slug: 'periodieke-keuring-installatie',
    title: 'Periodieke Keuring Elektrische Installatie: Noodzaak?',
    excerpt: 'Hoe vaak moet uw elektrische installatie gekeurd worden en waarom is dit belangrijk?',
    author: 'VindElektricien.nl Redactie',
    date: '2024-12-22',
    readTime: '5 min',
    category: 'Keuring',
    image: '/images/blog/periodieke-keuring.jpg',
  },
  {
    id: 19,
    slug: 'inductie-kookplaat-aansluiten',
    title: 'Inductie Kookplaat Aansluiten: Wat Komt Erbij Kijken?',
    excerpt: 'Een inductie kookplaat vraagt vaak om aanpassingen aan uw elektra. Dit is wat u moet weten.',
    author: 'VindElektricien.nl Redactie',
    date: '2024-12-18',
    readTime: '5 min',
    category: 'Installatie',
    image: '/images/blog/inductie-aansluiten.jpg',
  },
];

export const categories = [
  { name: 'Alle Artikelen', count: blogPosts.length },
  { name: 'Installatie', count: blogPosts.filter(p => p.category === 'Installatie').length },
  { name: 'Storingen', count: blogPosts.filter(p => p.category === 'Storingen').length },
  { name: 'Verduurzaming', count: blogPosts.filter(p => p.category === 'Verduurzaming').length },
  { name: 'Veiligheid', count: blogPosts.filter(p => p.category === 'Veiligheid').length },
  { name: 'Tips', count: blogPosts.filter(p => p.category === 'Tips').length },
  { name: 'Kosten', count: blogPosts.filter(p => p.category === 'Kosten').length },
  { name: 'Keuring', count: blogPosts.filter(p => p.category === 'Keuring').length },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category: string, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}

export function getLatestPosts(limit: number = 6): BlogPost[] {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

// Helper functions for internal linking
export function getElektricienLink(name: string): string {
  const slug = name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `/elektricien/${slug}`;
}

export function getProvinceLink(province: string): string {
  const slug = province.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `/provincie/${slug}`;
}

export function getCityLink(city: string): string {
  const slug = city
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `/stad/${slug}`;
}

export function getServiceTypeLink(type: string): string {
  const slug = type.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `/dienst/${slug}`;
}
