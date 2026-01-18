'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Send, MessageSquare, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InlineAd from '@/components/ads/InlineAd';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-primary-foreground/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-white">Contact</li>
            </ol>
          </nav>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Have a question, comment, or want to collaborate?
            We&apos;d love to hear from you and will respond within 1-2 business days.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 shadow-soft">
                <h2 className="font-serif text-2xl font-bold mb-6">Send us a message</h2>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-lg flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-teal-700 font-medium">Message sent!</p>
                      <p className="text-teal-600 text-sm">
                        Thank you for your message. We will get back to you as soon as possible.
                        You will receive a confirmation email at the address provided.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-700 font-medium">Something went wrong</p>
                      <p className="text-red-600 text-sm">
                        Please try again or send an email to info@rehabnearbyme.com.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name <span className="text-accent">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="border-2 focus:border-accent"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email address <span className="text-accent">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="border-2 focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject <span className="text-accent">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:border-accent bg-background"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General inquiry</option>
                      <option value="information">Add/update information</option>
                      <option value="partnership">Partnership</option>
                      <option value="technical">Technical issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Your message..."
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:border-accent resize-none bg-background"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send message
                      </>
                    )}
                  </Button>
                </form>
              </Card>

              <InlineAd />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info Card */}
              <Card className="p-6 shadow-soft">
                <h3 className="font-serif text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-teal-700" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:info@rehabnearbyme.com"
                        className="text-sm text-accent hover:underline"
                      >
                        info@rehabnearbyme.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-teal-700" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-teal-700" />
                    </div>
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-sm text-muted-foreground">
                        Within 1-2 business days
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* FAQ Topics Card */}
              <Card className="p-6 shadow-soft">
                <h3 className="font-serif text-lg font-semibold mb-4">Common Topics</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Add Information</p>
                      <p className="text-xs text-muted-foreground">
                        Do you manage a treatment facility? We&apos;d be happy to add your information.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Incorrect Information</p>
                      <p className="text-xs text-muted-foreground">
                        Something not right? Let us know so we can correct it.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Partnership</p>
                      <p className="text-xs text-muted-foreground">
                        Interested in a partnership? We&apos;d love to hear from you.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Admin Verification Card */}
              <Card className="p-6 shadow-soft bg-gradient-to-br from-teal-50 to-coral-50/50 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-100 dark:border-teal-800">
                <h3 className="font-serif text-lg font-semibold mb-3">For Treatment Facility Managers</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Do you manage a treatment facility and want to ensure your information is accurate
                  and complete? Contact us for a free verification of your listing.
                </p>
                <a
                  href="mailto:info@rehabnearbyme.com?subject=Treatment Facility Verification"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                >
                  Request verification
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="font-serif text-2xl font-semibold mb-4">
              Prefer to search directly?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Search our extensive database of treatment centers across the United States.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Search Treatment Centers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
