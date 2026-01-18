import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Rehab Near Me',
  description: 'Privacy policy of Rehab Near Me. Learn how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground">Home</Link></li>
          <li>/</li>
          <li className="text-foreground">Privacy Policy</li>
        </ol>
      </nav>

      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Rehab Near Me respects your privacy and is committed to protecting your personal data.
            This privacy policy informs you about how we handle your personal data when you visit our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. What Data Do We Collect?</h2>
          <p className="mb-4">We collect minimal data to provide our service:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Technical data such as IP address, browser type, and device information</li>
            <li>Usage data such as pages visited and search terms</li>
            <li>Cookies to improve user experience</li>
          </ul>
          <p className="mb-4">
            We do not collect personally identifiable information unless you voluntarily provide it
            (for example, when sending an email).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How Do We Use This Data?</h2>
          <p className="mb-4">The collected data is used for:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Improving our website and services</li>
            <li>Analyzing website traffic and user behavior</li>
            <li>Ensuring the security of our website</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Cookies</h2>
          <p className="mb-4">
            Our website uses cookies to improve your user experience. These are small text files stored on
            your device. You can refuse or delete cookies through your browser settings, but this
            may affect the functionality of the website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="mb-4">
            We take appropriate technical and organizational measures to protect your data against
            unauthorized access, loss, or misuse. Our website uses HTTPS encryption for secure
            data transfer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Sharing of Data</h2>
          <p className="mb-4">
            We do not sell, rent, or share your personal data with third parties for marketing purposes.
            Data is only shared when legally required or necessary for the operation of our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
          <p className="mb-4">You have the following rights regarding your data:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Right to access your data</li>
            <li>Right to correct inaccurate data</li>
            <li>Right to delete data</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. California Privacy Rights</h2>
          <p className="mb-4">
            If you are a California resident, you have additional rights under the California Consumer
            Privacy Act (CCPA). This includes the right to know what personal information we collect,
            the right to delete your information, and the right to opt-out of the sale of your personal
            information. We do not sell personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
          <p className="mb-4">
            For questions about this privacy policy or to exercise your rights, you can contact us at:
          </p>
          <p className="mb-4">
            Email: <a href="mailto:info@rehabnearbyme.com" className="text-primary hover:underline">info@rehabnearbyme.com</a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Changes</h2>
          <p className="mb-4">
            We reserve the right to modify this privacy policy. Significant changes will be communicated on
            our website. We advise you to check this page regularly.
          </p>
        </section>
      </div>
    </div>
  );
}
