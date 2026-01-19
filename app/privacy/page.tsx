import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacybeleid | VindElektricien.nl',
  description: 'Privacybeleid van VindElektricien.nl. Lees hoe wij omgaan met uw gegevens.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground">Home</Link></li>
          <li>/</li>
          <li className="text-foreground">Privacybeleid</li>
        </ol>
      </nav>

      <h1 className="text-4xl font-bold mb-8">Privacybeleid</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Inleiding</h2>
          <p className="mb-4">
            VindElektricien.nl respecteert uw privacy en zet zich in voor de bescherming van uw persoonsgegevens.
            Dit privacybeleid informeert u over hoe wij omgaan met uw persoonsgegevens wanneer u onze website bezoekt.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Welke Gegevens Verzamelen Wij?</h2>
          <p className="mb-4">Wij verzamelen minimale gegevens om onze dienst te kunnen leveren:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Technische gegevens zoals IP-adres, browsertype en apparaatinformatie</li>
            <li>Gebruiksgegevens zoals bezochte paginas en zoektermen</li>
            <li>Cookies om de gebruikerservaring te verbeteren</li>
          </ul>
          <p className="mb-4">
            Wij verzamelen geen persoonlijk identificeerbare gegevens tenzij u deze vrijwillig verstrekt
            (bijvoorbeeld bij het invullen van een contactformulier).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Hoe Gebruiken Wij Deze Gegevens?</h2>
          <p className="mb-4">De verzamelde gegevens worden gebruikt voor:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Het verbeteren van onze website en diensten</li>
            <li>Het analyseren van websiteverkeer en gebruikersgedrag</li>
            <li>Het waarborgen van de veiligheid van onze website</li>
            <li>Het voldoen aan wettelijke verplichtingen</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Cookies</h2>
          <p className="mb-4">
            Onze website maakt gebruik van cookies om uw gebruikerservaring te verbeteren. Dit zijn kleine tekstbestanden
            die op uw apparaat worden opgeslagen. U kunt cookies weigeren of verwijderen via uw browserinstellingen,
            maar dit kan de functionaliteit van de website beinvloeden.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Gegevensbeveiliging</h2>
          <p className="mb-4">
            Wij nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen tegen
            ongeautoriseerde toegang, verlies of misbruik. Onze website maakt gebruik van HTTPS-versleuteling
            voor veilige gegevensoverdracht.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Delen van Gegevens</h2>
          <p className="mb-4">
            Wij verkopen, verhuren of delen uw persoonsgegevens niet met derden voor marketingdoeleinden.
            Gegevens worden alleen gedeeld wanneer dit wettelijk verplicht is of noodzakelijk voor de werking
            van onze dienst.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Uw Rechten</h2>
          <p className="mb-4">Onder de AVG (Algemene Verordening Gegevensbescherming) heeft u de volgende rechten:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Recht op inzage van uw gegevens</li>
            <li>Recht op correctie van onjuiste gegevens</li>
            <li>Recht op verwijdering van gegevens</li>
            <li>Recht op beperking van verwerking</li>
            <li>Recht op overdraagbaarheid van gegevens</li>
            <li>Recht op bezwaar</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Bewaartermijn</h2>
          <p className="mb-4">
            Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk voor de doeleinden waarvoor ze zijn
            verzameld. Technische gegevens worden doorgaans na 26 maanden verwijderd, tenzij wettelijke
            verplichtingen anders vereisen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
          <p className="mb-4">
            Voor vragen over dit privacybeleid of om uw rechten uit te oefenen, kunt u contact met ons opnemen via:
          </p>
          <p className="mb-4">
            E-mail: <a href="mailto:info@vindelektricien.nl" className="text-yellow-600 hover:underline">info@vindelektricien.nl</a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Wijzigingen</h2>
          <p className="mb-4">
            Wij behouden ons het recht voor om dit privacybeleid te wijzigen. Belangrijke wijzigingen zullen
            op onze website worden gecommuniceerd. Wij adviseren u om deze pagina regelmatig te raadplegen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Klachten</h2>
          <p className="mb-4">
            Indien u een klacht heeft over de verwerking van uw persoonsgegevens, kunt u contact met ons opnemen.
            U heeft ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens (AP).
          </p>
        </section>
      </div>
    </div>
  );
}
