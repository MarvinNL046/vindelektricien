'use client';

import { useState, useEffect } from 'react';
import { Star, User, Loader2, Send, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Review {
  id: number;
  reviewer_name: string;
  reviewer_image_url?: string;
  rating: number;
  content: string;
  title?: string;
  review_date?: string;
  source: 'google' | 'user';
}

// Embedded review format from facility data
interface EmbeddedReview {
  reviewer_name: string;
  rating: number;
  review_text: string;
  review_date: string;
  reviewer_image?: string;
}

interface ReviewStats {
  totalReviews: number;
  googleReviews: number;
  userReviews: number;
  averageRating: string | null;
}

interface ReviewSectionProps {
  facilitySlug: string;
  facilityName: string;
  initialRating?: number;
  initialReviewCount?: number;
  embeddedReviews?: EmbeddedReview[];
}

export default function ReviewSection({
  facilitySlug,
  facilityName,
  initialRating,
  initialReviewCount,
  embeddedReviews
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');

  // Fetch reviews on mount - use embedded reviews if available, otherwise fetch from API
  useEffect(() => {
    async function fetchReviews() {
      // If we have embedded reviews, use those directly
      if (embeddedReviews && embeddedReviews.length > 0) {
        const googleReviews: Review[] = embeddedReviews
          .filter(r => r.review_text && r.review_text.trim().length > 0)
          .map((review, index) => ({
            id: index + 1,
            reviewer_name: review.reviewer_name,
            reviewer_image_url: review.reviewer_image,
            rating: review.rating,
            content: review.review_text,
            review_date: review.review_date,
            source: 'google' as const,
          }));

        setReviews(googleReviews);

        // Calculate stats from embedded reviews
        const allRatings = embeddedReviews.map(r => r.rating).filter(r => r != null);
        const avgRating = allRatings.length > 0
          ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1)
          : null;

        setStats({
          totalReviews: embeddedReviews.length,
          googleReviews: embeddedReviews.length,
          userReviews: 0,
          averageRating: avgRating,
        });

        setLoading(false);
        return;
      }

      // Fallback to API fetch for user-submitted reviews
      try {
        const response = await fetch('/api/reviews?slug=' + encodeURIComponent(facilitySlug) + '&source=user');
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || []);
          setStats(data.stats || null);
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [facilitySlug, embeddedReviews]);

  // Submit review
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('Please select a rating (1-5 stars)');
      return;
    }
    if (authorName.trim().length < 2) {
      setError('Please enter your name (at least 2 characters)');
      return;
    }
    if (reviewContent.trim().length < 20) {
      setError('Your review must be at least 20 characters');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facilitySlug,
          authorName: authorName.trim(),
          authorEmail: authorEmail.trim() || undefined,
          rating,
          title: reviewTitle.trim() || undefined,
          content: reviewContent.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      setSubmitted(true);
      // Reset form
      setRating(0);
      setAuthorName('');
      setAuthorEmail('');
      setReviewTitle('');
      setReviewContent('');
    } catch {
      setError('Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  }

  // Format date
  function formatDate(dateStr?: string) {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return '';
    }
  }

  // Use API stats or fallback to initial props
  const averageRating = stats?.averageRating ? parseFloat(stats.averageRating) : (initialRating || 0);
  const totalReviews = stats?.totalReviews || initialReviewCount || 0;

  return (
    <section className="mb-8">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Reviews & Ervaringen</h2>

          {/* Rating Summary */}
          {totalReviews > 0 ? (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={'w-5 h-5 ' + (star <= Math.round(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300')}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground">
                ({totalReviews} {totalReviews !== 1 ? 'reviews' : 'review'})
              </span>
              {stats && stats.googleReviews > 0 && (
                <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                  incl. {stats.googleReviews} Google reviews
                </span>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground mb-4">
              Er zijn nog geen reviews voor deze elektricien. Deel als eerste uw ervaring!
            </p>
          )}

          {/* Write Review Button */}
          {!showReviewForm && !submitted && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="mb-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Star className="w-4 h-4" />
              Schrijf een Review
            </button>
          )}

          {/* Success Message */}
          {submitted && (
            <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-teal-600" />
              <div>
                <p className="font-medium text-teal-800">Bedankt voor uw review!</p>
                <p className="text-sm text-teal-700">Uw review wordt gepubliceerd na moderatie.</p>
              </div>
            </div>
          )}

          {/* Review Form */}
          {showReviewForm && !submitted && (
            <Card className="p-4 mb-6 bg-muted/50">
              <h3 className="font-semibold mb-4">Deel uw ervaring met {facilityName}</h3>

              <form onSubmit={handleSubmit}>
                {/* Star Rating */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Uw beoordeling *</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={'w-8 h-8 transition-colors ' + (star <= (hoveredRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 hover:text-yellow-200')}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Naam *</label>
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="Uw naam"
                        className="w-full px-3 py-2 border rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">E-mail (optioneel)</label>
                      <input
                        type="email"
                        value={authorEmail}
                        onChange={(e) => setAuthorEmail(e.target.value)}
                        placeholder="uw@email.nl"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Titel (optioneel)</label>
                    <input
                      type="text"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="Korte samenvatting van uw ervaring"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Uw ervaring *</label>
                    <textarea
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      placeholder="Vertel over uw ervaring met deze elektricien. Hoe was de service? Wat vond u goed? Wat kan beter?"
                      rows={4}
                      className="w-full px-3 py-2 border rounded-md resize-none"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimaal 20 tekens ({reviewContent.length}/20)
                    </p>
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm">{error}</p>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      Review Versturen
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Annuleren
                    </button>
                  </div>
                </div>
              </form>
            </Card>
          )}

          {/* Reviews List */}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.source + '-' + review.id} className="border-b pb-4 last:border-0">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      {review.reviewer_image_url ? (
                        <img
                          src={review.reviewer_image_url}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">{review.reviewer_name}</span>
                        {review.review_date && (
                          <span className="text-sm text-muted-foreground">
                            • {formatDate(review.review_date)}
                          </span>
                        )}
                        {review.source === 'google' && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                            Google
                          </span>
                        )}
                      </div>
                      <div className="flex mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={'w-4 h-4 ' + (star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300')}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {review.title && (
                    <p className="font-medium mb-1">{review.title}</p>
                  )}
                  <p className="text-muted-foreground whitespace-pre-line">{review.content}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Card>
    </section>
  );
}
