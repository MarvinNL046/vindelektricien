'use client';

import { useEffect, useState } from 'react';

interface TypewriterHeadingProps {
  phrases: string[];
  highlightWords?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TypewriterHeading({
  phrases,
  highlightWords = [],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypewriterHeadingProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        } else {
          // Finished typing, pause before deleting
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  // Function to highlight specific words
  const renderTextWithHighlights = (text: string) => {
    const words = text.split(' ');
    return words.map((word, index) => {
      const isHighlighted = highlightWords.some(hw => 
        word.toLowerCase().includes(hw.toLowerCase())
      );
      
      return (
        <span key={index}>
          {index > 0 && ' '}
          {isHighlighted ? (
            <span className="text-primary relative">
              {word}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/20"></span>
            </span>
          ) : (
            word
          )}
        </span>
      );
    });
  };

  return (
    <>
      {renderTextWithHighlights(currentText)}
      <span className="inline-block w-1 h-10 md:h-12 bg-primary ml-1 animate-pulse"></span>
    </>
  );
}