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
    question: "What is inpatient rehab?",
    answer: "Inpatient rehab, also known as residential treatment, is a program where patients live at the treatment facility 24/7 while receiving intensive care. This includes medical supervision, individual and group therapy, medication management, and structured daily activities. Inpatient programs typically last 30, 60, or 90 days and are ideal for severe addictions or those who need a safe, substance-free environment."
  },
  {
    question: "How long does addiction treatment take?",
    answer: "Treatment duration varies based on individual needs, substance type, and addiction severity. Short-term programs typically last 28-30 days, while standard programs run 60-90 days. Long-term residential treatment can last 6-12 months. Research shows longer treatment periods often lead to better outcomes. Many people also continue with outpatient care and support groups after completing initial treatment."
  },
  {
    question: "Does insurance cover rehab?",
    answer: "Yes, most health insurance plans cover addiction treatment thanks to the Affordable Care Act and Mental Health Parity Act. Coverage typically includes detox, inpatient rehab, outpatient treatment, and medications. The extent of coverage varies by plan, so it's important to verify benefits with your insurance provider. Many treatment centers also offer payment plans or sliding scale fees for those without insurance."
  },
  {
    question: "What's the difference between inpatient and outpatient treatment?",
    answer: "Inpatient treatment requires living at the facility full-time with 24/7 medical supervision and structured programming. Outpatient treatment allows patients to live at home while attending scheduled therapy sessions. Intensive Outpatient Programs (IOP) typically involve 9-20 hours of treatment per week. Inpatient is recommended for severe addictions, while outpatient suits those with milder addictions, strong support systems, or work/family obligations."
  },
  {
    question: "What happens during detox?",
    answer: "Detox is the process of safely removing substances from your body under medical supervision. It typically lasts 3-10 days depending on the substance. Medical staff monitor vital signs, manage withdrawal symptoms, and may administer medications to ease discomfort and prevent complications. Symptoms can include nausea, anxiety, tremors, and insomnia. Detox alone is not treatment; it's the first step before comprehensive addiction therapy begins."
  },
  {
    question: "How do I choose the right treatment center?",
    answer: "Consider these factors when choosing a rehab: accreditation and licensing, treatment approaches offered (evidence-based therapies like CBT, DBT), staff credentials, specialized programs for your specific addiction, location preferences, insurance acceptance, aftercare planning, and amenities. Visit facilities if possible, read reviews, and ask about success rates. The right center should address your physical, mental, and emotional needs while fitting your personal circumstances."
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
    <section className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">{item.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
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
