'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send, Check, Star } from 'lucide-react';

interface FeedbackData {
  page_url: string;
  page_title: string;
  rating?: number;
  comment?: string;
  type?: 'rating' | 'comment' | 'combined';
}

export default function FeedbackRibbon() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show ribbon after user has scrolled down 25% of the page
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / document.documentElement.scrollHeight) * 100;
      setIsVisible(scrollPercentage > 25);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim() && rating === 0) return;

    setIsSubmitting(true);

    try {
      // Prepare data in API-expected format
      const feedbackData: FeedbackData = {
        page_url: window.location.pathname,
        page_title: document.title || 'Rehab Near Me',
      };

      // Determine type based on what was provided
      if (rating && feedback.trim()) {
        // Both rating and comment
        feedbackData.rating = rating;
        feedbackData.comment = feedback.trim();
        feedbackData.type = 'combined';
      } else if (rating) {
        // Only rating
        feedbackData.rating = rating;
        feedbackData.type = 'rating';
      } else if (feedback.trim()) {
        // Only comment
        feedbackData.comment = feedback.trim();
        feedbackData.type = 'comment';
      }

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
        setFeedback('');
        setRating(0);
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Feedback Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 bg-primary text-white px-3 py-8 rounded-l-lg shadow-lg hover:bg-primary/90 transition-all duration-300 z-40 ${
          isOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          <MessageCircle className="w-4 h-4 rotate-90" />
          Feedback
        </span>
      </button>

      {/* Feedback Panel */}
      <div className={`fixed right-0 top-1/2 -translate-y-1/2 bg-white shadow-2xl rounded-l-lg transition-all duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="w-80 max-h-[600px] p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Your Opinion Matters!</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSubmitted ? (
            <div className="py-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                <Check className="w-8 h-8 text-teal-600" />
              </div>
              <p className="text-lg font-medium text-teal-600">Thank you!</p>
              <p className="text-sm text-gray-600 mt-2">
                Your feedback helps us improve the website.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How satisfied are you with this page?
                </label>
                <div className="flex gap-1 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-1 transition-colors ${
                        star <= rating
                          ? 'text-yellow-400 hover:text-yellow-500'
                          : 'text-gray-300 hover:text-gray-400'
                      }`}
                    >
                      <Star className="w-8 h-8 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="ribbon-feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have suggestions for improvement?
                </label>
                <textarea
                  id="ribbon-feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your ideas with us..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={(!feedback.trim() && rating === 0) || isSubmitting}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending...' : 'Submit Feedback'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  100% anonymous & secure
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
