import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Rehab Near Me',
  description: 'Terms of service for Rehab Near Me.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground">Home</Link></li>
          <li>/</li>
          <li className="text-foreground">Terms of Service</li>
        </ol>
      </nav>

      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Definitions</h2>
          <p className="mb-4">
            In these terms of service, the following terms apply:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Website:</strong> Rehab Near Me (rehabnearbyme.com)</li>
            <li><strong>User:</strong> Any visitor to the website</li>
            <li><strong>Information:</strong> All data about treatment centers on the website</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Applicability</h2>
          <p className="mb-4">
            These terms of service apply to all use of the Rehab Near Me website.
            By using our website, you accept these terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Use of the Website</h2>
          <p className="mb-4">
            The website is intended for informational purposes. Users can:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Search for treatment centers in the United States</li>
            <li>View information about opening hours and facilities</li>
            <li>Get directions to treatment centers</li>
          </ul>
          <p className="mb-4">
            It is not permitted to use the website for illegal purposes or in a manner that
            could cause damage to the website or other users.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
          <p className="mb-4">
            All content on this website, including texts, images, logos, and data structures, is the property
            of Rehab Near Me or its licensors. It is not permitted to copy, reproduce, or distribute
            content without written permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Disclaimer</h2>
          <p className="mb-4">
            We strive to provide accurate and up-to-date information, but cannot guarantee that all
            information is completely correct at all times. Rehab Near Me is not liable for:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Inaccuracies in the provided information</li>
            <li>Decisions made based on information on the website</li>
            <li>Technical failures or interruptions</li>
            <li>Damages resulting from use of the website</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Links to External Websites</h2>
          <p className="mb-4">
            Our website may contain links to external websites. We are not responsible for the content
            or privacy policies of these external websites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes</h2>
          <p className="mb-4">
            We reserve the right to modify these terms of service at any time. Changes
            become effective as soon as they are published on the website. It is your responsibility to
            regularly check the terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
          <p className="mb-4">
            These terms of service are governed by the laws of the United States. Any disputes will be
            submitted to the competent courts in the United States.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
          <p className="mb-4">
            For questions about these terms of service, you can contact us at:
          </p>
          <p className="mb-4">
            Email: <a href="mailto:info@rehabnearbyme.com" className="text-primary hover:underline">info@rehabnearbyme.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
