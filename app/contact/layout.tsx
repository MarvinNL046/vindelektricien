import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Rehab Near Me',
  description: 'Contact Rehab Near Me for questions, suggestions or collaborations.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
