'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  Plus,
  Building2,
  Mail,
  User,
  Loader2,
  ChevronRight,
  MessageSquare,
  Settings,
  Heart,
  Trash2,
  Zap,
} from 'lucide-react';

interface UserData {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface Claim {
  id: number;
  placeId: number;
  status: 'pending' | 'verified' | 'approved' | 'rejected';
  businessRole?: string;
  claimantName?: string;
  notes?: string;
  createdAt: string;
}

interface Favorite {
  id: number;
  facility_slug: string;
  facility_name: string | null;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [removingFavorite, setRemovingFavorite] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('/api/auth/me', { credentials: 'include' });
        if (!userResponse.ok) {
          router.push('/login');
          return;
        }
        const userData = await userResponse.json();
        setUser(userData.user);

        // Fetch claims
        const claimsResponse = await fetch('/api/claims', { credentials: 'include' });
        if (claimsResponse.ok) {
          const claimsData = await claimsResponse.json();
          setClaims(claimsData.claims || []);
        }

        // Fetch favorites
        const favoritesResponse = await fetch('/api/favorites', { credentials: 'include' });
        if (favoritesResponse.ok) {
          const favoritesData = await favoritesResponse.json();
          setFavorites(favoritesData.favorites || []);
        }
      } catch (error) {
        console.error('Fout bij ophalen data:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      router.push('/');
    } catch (error) {
      console.error('Uitlog fout:', error);
    } finally {
      setLoggingOut(false);
    }
  };

  const handleRemoveFavorite = async (slug: string, id: number) => {
    setRemovingFavorite(id);
    try {
      const response = await fetch(`/api/favorites?slug=${slug}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        setFavorites(favorites.filter(f => f.id !== id));
      }
    } catch (error) {
      console.error('Fout bij verwijderen favoriet:', error);
    } finally {
      setRemovingFavorite(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            Goedgekeurd
          </span>
        );
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <Clock className="w-3 h-3" />
            In behandeling
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3" />
            E-mail verificatie vereist
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <AlertCircle className="w-3 h-3" />
            Afgewezen
          </span>
        );
      default:
        return null;
    }
  };

  const extractSlugFromNotes = (notes?: string) => {
    if (!notes) return null;
    const match = notes.match(/slug:([^\n]+)/);
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-bold text-gray-900">VindElektricien</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">{user.email}</span>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {loggingOut ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Uitloggen</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welkom terug, {user.name}!
          </h1>
          <p className="text-gray-600">
            Beheer je vermeldingen en claims vanuit je dashboard.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Geclaimde locaties</p>
                <p className="text-2xl font-bold text-gray-900">
                  {claims.filter(c => c.status === 'approved').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">In behandeling</p>
                <p className="text-2xl font-bold text-gray-900">
                  {claims.filter(c => c.status === 'pending' || c.status === 'verified').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Opgeslagen locaties</p>
                <p className="text-2xl font-bold text-gray-900">{favorites.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Claims Section */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Mijn Claims</h2>
                  <Link
                    href="/zoeken"
                    className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Nieuwe claim
                  </Link>
                </div>
              </div>

              {claims.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nog geen claims
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                    Claim je elektriciensbedrijf om je vermelding te beheren en bij te werken.
                  </p>
                  <Link
                    href="/zoeken"
                    className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Zoek je bedrijf
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {claims.map((claim) => {
                    const slug = extractSlugFromNotes(claim.notes);
                    return (
                      <div key={claim.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-medium text-gray-900">
                                {slug ? slug.replace(/-/g, ' ').replace(/facility /i, '') : `Claim #${claim.id}`}
                              </h3>
                              {getStatusBadge(claim.status)}
                            </div>
                            <p className="text-sm text-gray-500 mb-2">
                              {claim.businessRole || 'Eigenaar'}
                            </p>
                            <p className="text-xs text-gray-400">
                              Ingediend op {new Date(claim.createdAt).toLocaleDateString('nl-NL', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          {slug && (
                            <Link
                              href={`/elektricien/${slug}`}
                              className="text-yellow-600 hover:text-yellow-700"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Favorites Section */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-red-500" />
                  <h2 className="text-lg font-semibold text-gray-900">Opgeslagen locaties</h2>
                </div>
              </div>

              {favorites.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-red-300" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Geen opgeslagen locaties
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                    Sla elektriciens op die je wilt onthouden of vergelijken.
                  </p>
                  <Link
                    href="/zoeken"
                    className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    Ontdek elektriciens
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {favorites.map((favorite) => (
                    <div key={favorite.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/elektricien/${favorite.facility_slug}`}
                          className="flex-1 group"
                        >
                          <h3 className="font-medium text-gray-900 group-hover:text-yellow-600 transition-colors">
                            {favorite.facility_name || favorite.facility_slug.replace(/-/g, ' ')}
                          </h3>
                          <p className="text-xs text-gray-400 mt-1">
                            Opgeslagen op {new Date(favorite.created_at).toLocaleDateString('nl-NL', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </Link>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/elektricien/${favorite.facility_slug}`}
                            className="text-gray-400 hover:text-yellow-600 p-2"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleRemoveFavorite(favorite.facility_slug, favorite.id)}
                            disabled={removingFavorite === favorite.id}
                            className="text-gray-400 hover:text-red-500 p-2 disabled:opacity-50"
                            title="Verwijderen"
                          >
                            {removingFavorite === favorite.id ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <Trash2 className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Accountgegevens</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Naam</p>
                    <p className="font-medium text-gray-900">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">E-mail</p>
                    <p className="font-medium text-gray-900">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Snelle acties</h3>
              <div className="space-y-2">
                <Link
                  href="/zoeken"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                    <Plus className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Nieuwe claim</p>
                    <p className="text-sm text-gray-500">Claim een bedrijf</p>
                  </div>
                </Link>
                <button
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group opacity-50 cursor-not-allowed"
                  disabled
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Berichten</p>
                    <p className="text-sm text-gray-500">Binnenkort beschikbaar</p>
                  </div>
                </button>
                <button
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group opacity-50 cursor-not-allowed"
                  disabled
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Instellingen</p>
                    <p className="text-sm text-gray-500">Binnenkort beschikbaar</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="font-semibold mb-2">Hulp nodig?</h3>
              <p className="text-yellow-100 text-sm mb-4">
                Neem contact met ons op als je vragen hebt over het claimen of beheren van vermeldingen.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-yellow-600 font-medium px-4 py-2 rounded-lg hover:bg-yellow-50 transition-colors text-sm"
              >
                Contact opnemen
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
