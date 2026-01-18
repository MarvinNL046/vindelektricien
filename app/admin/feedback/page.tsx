'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MessageSquare,
  Star,
  Loader2,
  RefreshCw,
  ExternalLink,
  Trash2,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface FeedbackItem {
  id: string;
  type: 'rating' | 'comment';
  rating: number | null;
  feedback: string | null;
  page_title: string | null;
  page_url: string | null;
  timestamp: string;
  status?: 'new' | 'read' | 'resolved';
}

export default function AdminFeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'rating' | 'comment'>('all');

  const fetchFeedback = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/feedback');
      if (!response.ok) throw new Error('Failed to fetch feedback');
      const data = await response.json();
      setFeedback(data.feedback || []);
    } catch (err) {
      setError('Could not load feedback');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;

    try {
      const response = await fetch(`/api/admin/feedback/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFeedback(feedback.filter(f => f.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete feedback:', err);
    }
  };

  const handleMarkResolved = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/feedback/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'resolved' }),
      });
      if (response.ok) {
        setFeedback(feedback.map(f =>
          f.id === id ? { ...f, status: 'resolved' } : f
        ));
      }
    } catch (err) {
      console.error('Failed to update feedback:', err);
    }
  };

  const filteredFeedback = feedback.filter(f => {
    if (filter === 'all') return true;
    return f.type === filter;
  });

  const stats = {
    total: feedback.length,
    ratings: feedback.filter(f => f.type === 'rating').length,
    comments: feedback.filter(f => f.type === 'comment').length,
    avgRating: feedback.filter(f => f.rating).length > 0
      ? (feedback.filter(f => f.rating).reduce((acc, f) => acc + (f.rating || 0), 0) /
         feedback.filter(f => f.rating).length).toFixed(1)
      : '-',
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Feedback</h1>
            <p className="text-muted-foreground">
              View and manage user feedback
            </p>
          </div>
          <Button onClick={fetchFeedback} variant="outline" disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.ratings}</p>
                <p className="text-sm text-muted-foreground">Ratings</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.comments}</p>
                <p className="text-sm text-muted-foreground">Comments</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-600 fill-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.avgRating}</p>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({stats.total})
          </Button>
          <Button
            variant={filter === 'rating' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('rating')}
          >
            Ratings ({stats.ratings})
          </Button>
          <Button
            variant={filter === 'comment' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('comment')}
          >
            Comments ({stats.comments})
          </Button>
        </div>

        {/* Error */}
        {error && (
          <Card className="p-4 bg-red-50 border-red-200 mb-6">
            <p className="text-red-700">{error}</p>
          </Card>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredFeedback.length === 0 ? (
          <Card className="p-8 text-center">
            <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No feedback received yet</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredFeedback.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      {item.type === 'rating' ? (
                        <div className="flex items-center gap-2">
                          {item.rating && renderStars(item.rating)}
                          <span className="text-sm text-muted-foreground">
                            ({item.rating}/5)
                          </span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Feedback
                        </span>
                      )}
                      {item.status === 'resolved' && (
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Resolved
                        </span>
                      )}
                    </div>

                    {item.feedback && (
                      <p className="text-foreground mb-2">{item.feedback}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      {item.page_title && (
                        <span className="truncate max-w-[200px]">
                          Page: {item.page_title}
                        </span>
                      )}
                      {item.page_url && (
                        <a
                          href={`https://www.rehabnearbyme.com${item.page_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:underline"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View page
                        </a>
                      )}
                      <span className="inline-flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(item.timestamp).toLocaleString('en-US')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status !== 'resolved' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkResolved(item.id)}
                        title="Mark as resolved"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
