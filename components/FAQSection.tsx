'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Wat kost een elektricien per uur?",
    answer: "De kosten van een elektricien varieren tussen de 45 en 75 euro per uur, afhankelijk van het type werk, de regio en of het om spoedreparaties gaat. Voorrijkosten zijn vaak 25-50 euro extra. Voor grotere klussen zoals een nieuwe groepenkast of laadpaal installatie wordt vaak een vaste prijs afgesproken. Vraag altijd vooraf een offerte aan om verrassingen te voorkomen."
  },
  {
    question: "Wanneer heb ik een erkende elektricien nodig?",
    answer: "Een erkende elektricien is verplicht voor werkzaamheden aan de elektrische installatie die invloed hebben op de veiligheid, zoals het vervangen van de meterkast, aanleggen van nieuwe groepen, of installeren van een laadpaal. Erkende elektriciens beschikken over de juiste certificeringen en mogen een installatiecertificaat afgeven. Voor kleine reparaties zoals het vervangen van een stopcontact is dit niet wettelijk verplicht, maar wel aan te raden."
  },
  {
    question: "Hoe lang duurt het installeren van een laadpaal?",
    answer: "De installatie van een laadpaal duurt gemiddeld 2-4 uur, afhankelijk van de locatie en of er aanpassingen aan de groepenkast nodig zijn. Als er een aparte groep moet worden aangelegd of de meterkast moet worden uitgebreid, kan dit een dagdeel extra kosten. De elektricien zal vooraf de situatie beoordelen en aangeven wat er nodig is."
  },
  {
    question: "Wat moet ik doen bij een stroomstoring?",
    answer: "Controleer eerst of de storing alleen bij u is of ook bij buren. Check of de hoofdschakelaar en groepenschakelaars in de meterkast niet zijn uitgeschakeld. Als er een aardlekschakelaar is gesprongen, kan dit wijzen op een defect apparaat - koppel apparaten los en schakel de aardlekschakelaar weer in. Bij terugkerend uitschakelen of onverklaarbare storingen, neem contact op met een elektricien. Bij levensgevaarlijke situaties zoals brand of vonken, verlaat het pand en bel 112."
  },
  {
    question: "Wanneer moet de meterkast worden vervangen?",
    answer: "Een meterkast moet worden vervangen als deze ouder is dan 30 jaar, nog stoppen (zekeringen) bevat in plaats van automaten, geen aardlekschakelaar heeft, of onvoldoende groepen heeft voor het huidige stroomverbruik. Ook bij uitbreiding van de woning, plaatsing van zonnepanelen of een laadpaal is vaak een nieuwe of uitgebreide groepenkast nodig. Een moderne groepenkast verhoogt de veiligheid en kan tot 30 jaar meegaan."
  },
  {
    question: "Hoeveel kost het vervangen van een groepenkast?",
    answer: "Het vervangen van een complete groepenkast kost gemiddeld 800-1.500 euro, afhankelijk van het aantal groepen en de complexiteit. Een basiskast met 6-8 groepen is goedkoper dan een uitgebreide kast met 12 of meer groepen. De prijs is inclusief materiaal, arbeid en een installatiecertificaat. Bij oudere woningen kunnen extra kosten ontstaan voor het vervangen van verouderde bedrading."
  }
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // JSON-LD structured data for FAQ
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-12 bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Veelgestelde Vragen</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">{item.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-yellow-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-4 pt-0">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
