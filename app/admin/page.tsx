'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Building2,
  FileCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Loader2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Stats {
  totalUsers: number;
  totalClaims: number;
  pendingClaims: number;
  approvedClaims: number;
  rejectedClaims: number;
  totalUserFacilities: number;
  pendingFacilities: number;
  recentUsers: Array<{
    id: number;
    name: string;
    email: string;
    createdAt: string;
  }>;
  recentClaims: Array<{
    id: number;
    facilityName: string;
    status: string;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
      href: '/admin/users',
    },
    {
      title: 'Total Claims',
      value: stats?.totalClaims || 0,
      icon: FileCheck,
      color: 'bg-green-500',
      href: '/admin/claims',
    },
    {
      title: 'Pending',
      value: stats?.pendingClaims || 0,
      icon: Clock,
      color: 'bg-yellow-500',
      href: '/admin/claims?status=pending',
    },
    {
      title: 'Submitted Locations',
      value: stats?.totalUserFacilities || 0,
      icon: Building2,
      color: 'bg-purple-500',
      href: '/admin/facilities',
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-serif text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage users, claims and facility listings.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-hover transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-serif">Recent Registrations</CardTitle>
            <Link
              href="/admin/users"
              className="text-sm text-accent hover:underline flex items-center gap-1"
            >
              View all
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {stats?.recentUsers && stats.recentUsers.length > 0 ? (
              <div className="space-y-3">
                {stats.recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString('en-US')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No users yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Claims */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-serif">Recent Claims</CardTitle>
            <Link
              href="/admin/claims"
              className="text-sm text-accent hover:underline flex items-center gap-1"
            >
              View all
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {stats?.recentClaims && stats.recentClaims.length > 0 ? (
              <div className="space-y-3">
                {stats.recentClaims.map((claim) => (
                  <div
                    key={claim.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        claim.status === 'approved'
                          ? 'bg-green-100'
                          : claim.status === 'pending'
                          ? 'bg-yellow-100'
                          : 'bg-red-100'
                      }`}>
                        {claim.status === 'approved' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : claim.status === 'pending' ? (
                          <Clock className="w-4 h-4 text-yellow-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium line-clamp-1">{claim.facilityName}</p>
                        <p className="text-xs text-muted-foreground capitalize">{claim.status}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(claim.createdAt).toLocaleDateString('en-US')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No claims yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-serif">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/claims?status=pending"
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              <Clock className="w-4 h-4" />
              Pending claims ({stats?.pendingClaims || 0})
            </Link>
            <Link
              href="/admin/facilities?status=pending"
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Building2 className="w-4 h-4" />
              New locations ({stats?.pendingFacilities || 0})
            </Link>
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Users className="w-4 h-4" />
              Manage users
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
