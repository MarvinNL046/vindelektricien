import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Rehab Near Me Guides',
    default: 'Treatment Guides & Resources | Rehab Near Me',
  },
  description: 'Expert guides on addiction treatment types, rehab options, insurance coverage, and recovery resources across America.',
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-secondary/20 min-h-screen">
      {children}
    </div>
  );
}
