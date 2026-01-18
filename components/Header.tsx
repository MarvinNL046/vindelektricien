'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Heart } from 'lucide-react';
// MVP: Login temporarily disabled
// import { User, LogOut, LayoutDashboard, ChevronDown, Shield } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Search' },
  { href: '/type', label: 'Treatment Types' },
  { href: '/guide', label: 'Guide' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact', highlight: true },
];

// MVP: Login temporarily disabled
// interface UserData {
//   id: number;
//   email: string;
//   name: string;
//   role: string;
// }

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // MVP: Login temporarily disabled
  // const [user, setUser] = useState<UserData | null>(null);
  // const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // MVP: Login temporarily disabled
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await fetch('/api/auth/me', {
  //         credentials: 'include',
  //         cache: 'no-store',
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         setUser(data.user);
  //       }
  //     } catch {
  //       // User not logged in
  //     }
  //   };
  //   checkAuth();
  // }, []);

  // MVP: Login temporarily disabled
  // const handleLogout = async () => {
  //   try {
  //     await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
  //     setUser(null);
  //     setUserMenuOpen(false);
  //     window.location.href = '/';
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   }
  // };

  return (
    <header
      className={`bg-white/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? 'shadow-soft' : ''
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    link.highlight
                      ? 'text-teal-600 hover:text-teal-700 hover:bg-teal-50'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Auth + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* MVP: Login temporarily disabled */}
            {/* {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium hidden xl:inline">{user.name || 'Account'}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-hover border py-2 z-20">
                      <div className="px-4 py-2 border-b">
                        <p className="font-medium text-sm">{user.name || 'Account'}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary/50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-purple-600 hover:bg-purple-50 transition-colors"
                        >
                          <Shield className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      )}
                      <div className="border-t my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary/50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
            )} */}
            <Link href="/search">
              <Button variant="default" size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                <Heart className="w-4 h-4 mr-2" />
                Find Treatment
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button - min 44x44px touch target */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 -m-1 rounded-lg hover:bg-secondary/50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      link.highlight
                        ? 'text-teal-600 font-medium hover:bg-teal-50'
                        : 'text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Search CTA */}
            <div className="mt-4 pt-4 border-t">
              <Link href="/search" onClick={() => setIsMenuOpen(false)}>
                <Button variant="default" className="w-full bg-teal-600 hover:bg-teal-700 text-white" size="lg">
                  <Heart className="w-5 h-5 mr-2" />
                  Find Treatment
                </Button>
              </Link>
            </div>

            {/* MVP: Mobile Auth Section temporarily disabled */}
            {/* <div className="mt-4 pt-4 border-t">
              {user ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-4 py-3 bg-secondary/30 rounded-lg">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{user.name || 'Account'}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <Shield className="w-5 h-5" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-secondary/50 rounded-lg transition-colors w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex-1">
                    <Button variant="default" className="w-full" size="lg">
                      <User className="w-5 h-5" />
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)} className="flex-1">
                    <Button variant="outline" className="w-full" size="lg">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div> */}
          </div>
        )}
      </nav>
    </header>
  );
}
