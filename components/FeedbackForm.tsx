'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Send, X } from 'lucide-react';

interface FeedbackFormProps {
  pageTitle?: string;
  pageUrl?: string;
}

export default function FeedbackForm({ pageTitle, pageUrl }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Get prompt text based on rating
  const getPromptText = () => {
    if (rating <= 2) return 'What can we improve?';
    if (rating === 3) return 'What is missing?';
    return 'What did you like?';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating first');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          comment: comment.trim() || undefined,
          page_title: pageTitle,
          page_url: pageUrl || window.location.pathname,
          type: 'rating'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setRating(0);
    setComment('');
    setIsSubmitted(false);
    setError('');
  };

  if (isSubmitted) {
    return (
      <Card className="p-6 bg-teal-50 border-teal-200">
        <div className="text-center space-y-2">
          <p className="text-teal-700 font-medium">
            Thank you for your feedback! ✓
          </p>
          <p className="text-sm text-teal-600">
            Your input helps us improve our information.
          </p>
          <button
            onClick={handleReset}
            className="text-sm text-teal-700 underline hover:no-underline mt-2"
          >
            Submit new feedback
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold">Was this information helpful?</h3>

        {/* Rating stars */}
        <div className="space-y-1">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                disabled={isSubmitting}
                className="p-1 transition-colors disabled:opacity-50"
                aria-label={`Rate ${star} stars`}
              >
                <Star
                  className={`w-7 h-7 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-200'
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-sm text-muted-foreground">
              {rating === 1 && 'Very dissatisfied'}
              {rating === 2 && 'Dissatisfied'}
              {rating === 3 && 'Neutral'}
              {rating === 4 && 'Satisfied'}
              {rating === 5 && 'Very satisfied'}
            </p>
          )}
        </div>

        {/* Comment box - shows after rating selection */}
        {rating > 0 && (
          <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="relative">
              <label className="block text-sm font-medium mb-1.5">
                {getPromptText()} <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={
                  rating <= 2
                    ? "E.g. missing info, errors, unclear information..."
                    : rating === 3
                    ? "E.g. additional information you'd like to see..."
                    : "E.g. what was especially helpful for you..."
                }
                className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                rows={3}
                maxLength={500}
              />
              {comment && (
                <button
                  type="button"
                  onClick={() => setComment('')}
                  className="absolute top-8 right-2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {comment.length}/500 characters
              </span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending...' : 'Send'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </form>
    </Card>
  );
}