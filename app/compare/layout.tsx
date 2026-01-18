import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare Treatment Centers | RehabNearMe.com',
  description: 'Compare treatment centers side by side. View details, photos, ratings, and services to find the right facility.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
