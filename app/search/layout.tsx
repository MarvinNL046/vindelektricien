import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Treatment Centers | RehabNearMe.com',
  description: 'Search our database of addiction treatment centers across the United States. Find rehab facilities by name, city, state, or zip code.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
