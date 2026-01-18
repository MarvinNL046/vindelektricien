'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, User, ArrowRight, Loader2, KeyRound, CheckCircle, Trees } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<'details' | 'code' | 'success'>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeHash, setCodeHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, type: 'register' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setCodeHash(data.codeHash);
      setStep('code');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, codeHash }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStep('success');
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Gradient Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-coral-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/15 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Trees className="w-6 h-6 text-coral-400" />
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-white">Rehab</span>
              <span className="text-2xl font-serif font-bold text-coral-400">NearMe</span>
            </div>
          </Link>
          <h2 className="font-serif text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
            Find recovery, hope
            <br />
            <span className="text-coral-300">and healing.</span>
          </h2>
          <p className="text-white/70 text-lg max-w-md">
            Create an account and manage your facility listings. Help people find the right care.
          </p>

          {/* Benefits on desktop */}
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-coral-500/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-coral-400" />
              </div>
              <span className="text-white/80">Claim facility listings</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-coral-500/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-coral-400" />
              </div>
              <span className="text-white/80">Manage your location information</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-coral-500/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-coral-400" />
              </div>
              <span className="text-white/80">View statistics and messages</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <Trees className="w-8 h-8 text-primary" />
              <div>
                <span className="text-xl font-serif font-bold text-primary">Rehab</span>
                <span className="text-xl font-serif font-bold text-accent">NearMe</span>
              </div>
            </Link>
          </div>

          <Card className="p-6 sm:p-8 shadow-soft">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {step === 'success' ? 'Account created!' : 'Create account'}
              </h1>
              <p className="text-muted-foreground">
                {step === 'details' && 'Create an account to claim listings'}
                {step === 'code' && 'Enter the verification code'}
                {step === 'success' && 'You will be redirected to your dashboard'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            {step === 'details' && (
              <form onSubmit={handleSendCode} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Smith"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {step === 'code' && (
              <form onSubmit={handleVerifyCode} className="space-y-6">
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-foreground mb-2">
                    Verification code
                  </label>
                  <p className="text-sm text-muted-foreground mb-3">
                    We sent a 6-digit code to <strong className="text-foreground">{email}</strong>
                  </p>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="code"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="123456"
                      required
                      maxLength={6}
                      pattern="\d{6}"
                      className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-center text-2xl tracking-widest font-mono"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  disabled={loading || code.length !== 6}
                  className="w-full"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Verify
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('details');
                    setCode('');
                    setError('');
                  }}
                  className="w-full text-muted-foreground hover:text-foreground text-sm py-2 transition-colors"
                >
                  Back to details
                </button>
              </form>
            )}

            {step === 'success' && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Welcome, {name}!</h2>
                <p className="text-muted-foreground mb-4">
                  Your account has been successfully created. You will now be redirected to your dashboard.
                </p>
                <Loader2 className="w-6 h-6 animate-spin text-accent mx-auto" />
              </div>
            )}

            {/* Footer */}
            {step !== 'success' && (
              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <Link href="/login" className="text-accent hover:text-accent/80 font-semibold transition-colors">
                    Log in
                  </Link>
                </p>
              </div>
            )}
          </Card>

          {/* Benefits - Mobile only */}
          {step === 'details' && (
            <div className="lg:hidden mt-8 space-y-3">
              <h3 className="text-sm font-semibold text-foreground text-center mb-4">
                With an account you can:
              </h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 bg-card rounded-lg p-3 shadow-sm border border-border">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">Claim facility listings</span>
                </div>
                <div className="flex items-center gap-3 bg-card rounded-lg p-3 shadow-sm border border-border">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">Manage your location information</span>
                </div>
                <div className="flex items-center gap-3 bg-card rounded-lg p-3 shadow-sm border border-border">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">View statistics and messages</span>
                </div>
              </div>
            </div>
          )}

          {/* Privacy note */}
          <p className="text-center text-muted-foreground text-sm mt-6">
            By registering you agree to our{' '}
            <Link href="/privacy" className="text-accent hover:underline">
              privacy policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
