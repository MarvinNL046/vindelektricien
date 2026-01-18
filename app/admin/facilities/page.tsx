'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  MoreVertical,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Eye,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Facility {
  id: number;
  userId: number;
  name: string;
  slug: string;
  type: string;
  address: string | null;
  zipCode: string | null;
  city: string;
  county: string;
  state: string;
  status: string;
  rejectionReason: string | null;
  createdAt: string;
  userName: string | null;
  userEmail: string | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminFacilitiesPage() {
  const searchParams = useSearchParams();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState<Facility | null>(null);
  const [showRejectModal, setShowRejectModal] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchFacilities = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', page.toString());
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);

      const response = await fetch(`/api/admin/facilities?${params}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setFacilities(data.facilities);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching facilities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, [search, statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFacilities(1);
  };

  const handleApprove = async (facilityId: number) => {
    setActionLoading(true);
    try {
      const response = await fetch(`/api/admin/facilities/${facilityId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: 'approved' }),
      });

      if (response.ok) {
        setFacilities(facilities.map(c =>
          c.id === facilityId ? { ...c, status: 'approved' } : c
        ));
      }
    } catch (error) {
      console.error('Error approving facility:', error);
    } finally {
      setActionLoading(false);
      setOpenMenu(null);
    }
  };

  const handleReject = async () => {
    if (!showRejectModal || !rejectionReason.trim()) return;
    setActionLoading(true);
    try {
      const response = await fetch(`/api/admin/facilities/${showRejectModal}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: 'rejected', rejectionReason }),
      });

      if (response.ok) {
        setFacilities(facilities.map(c =>
          c.id === showRejectModal
            ? { ...c, status: 'rejected', rejectionReason }
            : c
        ));
      }
    } catch (error) {
      console.error('Error rejecting facility:', error);
    } finally {
      setActionLoading(false);
      setShowRejectModal(null);
      setRejectionReason('');
    }
  };

  const handleDelete = async (facilityId: number) => {
    if (!confirm('Are you sure you want to delete this facility?')) return;
    try {
      const response = await fetch(`/api/admin/facilities/${facilityId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setFacilities(facilities.filter(c => c.id !== facilityId));
        if (pagination) {
          setPagination({ ...pagination, total: pagination.total - 1 });
        }
      }
    } catch (error) {
      console.error('Error deleting facility:', error);
    }
    setOpenMenu(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <AlertCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-serif text-foreground">Submitted Facilities</h1>
        <p className="text-muted-foreground">
          Review and approve user-submitted facilities ({pagination?.total || 0} total)
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, county or city..."
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      {/* Facilities Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : facilities.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              No submitted facilities found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium">Facility</th>
                    <th className="text-left p-4 text-sm font-medium hidden md:table-cell">Location</th>
                    <th className="text-left p-4 text-sm font-medium hidden lg:table-cell">Submitted by</th>
                    <th className="text-left p-4 text-sm font-medium">Status</th>
                    <th className="text-right p-4 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {facilities.map((facility) => (
                    <tr key={facility.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-medium line-clamp-1">{facility.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{facility.type}</p>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {facility.city}, {facility.state}
                        </div>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <div>
                          <p className="text-sm">{facility.userName}</p>
                          <p className="text-xs text-muted-foreground">{facility.userEmail}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(facility.status)}
                      </td>
                      <td className="p-4 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={() => setOpenMenu(openMenu === facility.id ? null : facility.id)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {openMenu === facility.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setOpenMenu(null)}
                              />
                              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border py-1 z-20">
                                <button
                                  onClick={() => {
                                    setShowDetails(facility);
                                    setOpenMenu(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                                >
                                  <Eye className="w-4 h-4" />
                                  View details
                                </button>
                                {facility.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => handleApprove(facility.id)}
                                      disabled={actionLoading}
                                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-green-50 transition-colors"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => {
                                        setShowRejectModal(facility.id);
                                        setOpenMenu(null);
                                      }}
                                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                      <XCircle className="w-4 h-4" />
                                      Reject
                                    </button>
                                  </>
                                )}
                                <button
                                  onClick={() => handleDelete(facility.id)}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="p-4 border-t flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === 1}
                  onClick={() => fetchFacilities(pagination.page - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => fetchFacilities(pagination.page + 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="w-full max-w-2xl my-8">
            <CardHeader>
              <CardTitle className="text-lg font-serif">Facility Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium text-lg">{showDetails.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{showDetails.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-1">{getStatusBadge(showDetails.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{showDetails.address || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Zip Code</p>
                  <p className="font-medium">{showDetails.zipCode || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="font-medium">{showDetails.city}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">County</p>
                  <p className="font-medium">{showDetails.county}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  <p className="font-medium">{showDetails.state}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Submitted by</p>
                  <p className="font-medium">{showDetails.userName}</p>
                  <p className="text-sm text-muted-foreground">{showDetails.userEmail}</p>
                </div>
              </div>

              {showDetails.rejectionReason && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rejection reason</p>
                  <p className="text-sm bg-red-50 text-red-700 p-3 rounded-lg">{showDetails.rejectionReason}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowDetails(null)}
                  className="flex-1"
                >
                  Close
                </Button>
                {showDetails.status === 'pending' && (
                  <>
                    <Button
                      onClick={() => {
                        handleApprove(showDetails.id);
                        setShowDetails(null);
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setShowRejectModal(showDetails.id);
                        setShowDetails(null);
                      }}
                      className="flex-1"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-lg font-serif">Reject facility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Reason for rejection *
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full h-32 px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Explain why this facility is being rejected..."
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowRejectModal(null);
                      setRejectionReason('');
                    }}
                    className="flex-1"
                    disabled={actionLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleReject}
                    className="flex-1"
                    disabled={!rejectionReason.trim() || actionLoading}
                  >
                    {actionLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Reject'
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
