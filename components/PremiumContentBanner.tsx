import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PremiumContentBanner() {
  return (
    <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-primary">FREE GUIDE</span>
            </div>

            <h3 className="text-2xl font-bold mb-3">
              The Complete Guide to Addiction Treatment
            </h3>

            <p className="text-gray-700 mb-4">
              Download our comprehensive guide with everything you need to know about:
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <span className="text-sm">Understanding treatment options and levels of care</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <span className="text-sm">Insurance coverage and payment options</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <span className="text-sm">What to expect during treatment</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <span className="text-sm">Supporting a loved one through recovery</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/guide">
                <Button size="lg" className="group">
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Treatment Guides
                </Button>
              </Link>
              <p className="text-xs text-gray-500 self-center">
                No registration required
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
              <div className="bg-white p-8 rounded-lg shadow-xl transform rotate-3 hover:rotate-1 transition-transform">
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-20 bg-gray-100 rounded my-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                </div>
                <div className="absolute top-4 right-4 text-primary font-bold text-lg">
                  PDF
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
