'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ReadMoreProps {
  text: string;
  maxLength?: number;
  className?: string;
}

export default function ReadMore({ text, maxLength = 500, className = '' }: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Normalize newlines - handle both literal \n\n and actual newlines
  const normalizedText = text
    .replace(/\\n\\n/g, '\n\n')  // Convert literal \n\n to actual newlines
    .replace(/\\n/g, '\n');      // Convert literal \n to actual newlines

  // Split text into paragraphs
  const paragraphs = normalizedText.split(/\n\n+/).filter(p => p.trim());

  // Check if text needs truncation - show button if long text OR more than 2 paragraphs
  const needsTruncation = normalizedText.length > maxLength || paragraphs.length > 2;

  // Get truncated version (first 2 paragraphs or maxLength chars)
  const getTruncatedText = () => {
    if (paragraphs.length <= 2) {
      // If 2 or fewer paragraphs, truncate by character count
      if (normalizedText.length <= maxLength) return normalizedText;
      return normalizedText.substring(0, maxLength).trim() + '...';
    }
    // Show first 2 paragraphs
    return paragraphs.slice(0, 2).join('\n\n');
  };

  const displayText = isExpanded ? normalizedText : getTruncatedText();
  const displayParagraphs = displayText.split(/\n\n+/).filter(p => p.trim());

  // No truncation needed - show all content without button
  if (!needsTruncation) {
    return (
      <div className={`prose prose-lg max-w-none text-muted-foreground space-y-4 ${className}`}>
        {paragraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph.trim()}</p>
        ))}
      </div>
    );
  }

  // Show truncated content with button
  return (
    <div className={className}>
      <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
        {displayParagraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph.trim()}</p>
        ))}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 inline-flex items-center gap-1 text-accent hover:text-accent/80 font-medium transition-colors"
      >
        {isExpanded ? (
          <>
            <span>Lees minder</span>
            <ChevronUp className="w-4 h-4" />
          </>
        ) : (
          <>
            <span>Lees meer</span>
            <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}
