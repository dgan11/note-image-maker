'use client';

import React from 'react';

interface BookQuoteNoteProps {
  content: string;
}

export default function BookQuoteNote({ content }: BookQuoteNoteProps) {
  const processContent = (content: string) => {
    // Extract title, author, and quote from content
    let title = 'EAST OF EDEN';
    let author = 'JOHN STEINBECK';
    let quote = '';
    
    // Look for title pattern (first line) and author (second line)
    const lines = content.split('\n');
    if (lines.length >= 2) {
      // Get title and author from first two lines if they exist
      if (lines[0].trim()) {
        title = lines[0].trim().toUpperCase();
      }
      
      if (lines[1].trim().startsWith('By:')) {
        author = lines[1].trim().replace('By:', '').trim().toUpperCase();
      }
      
      // Use the rest of the content as the quote
      quote = lines.slice(2).join('\n').trim();
    } else {
      quote = content;
    }

    return { title, author, quote };
  };

  const { title, author, quote } = processContent(content);

  // Format quote for display while preserving paragraph breaks
  // Split by double newlines to identify paragraphs
  const paragraphs = quote.split(/\n\s*\n/).map(p => p.trim().replace(/\n/g, ' '));
  
  // Remove surrounding quotes if present in each paragraph
  const formattedParagraphs = paragraphs.map(p => {
    if (p.startsWith('"') && p.endsWith('"')) {
      return p.slice(1, -1);
    }
    return p;
  });

  return (
    <div className="book-quote-container">
      <div className="book-title">{title}</div>
      <div className="book-author">{author}</div>
      
      <div className="book-divider">
        <div className="book-divider-icon"></div>
      </div>
      
      <div className="book-quote">
        <span>
          &ldquo;{formattedParagraphs.map((paragraph, index) => (
            <React.Fragment key={index}>
              {index > 0 && <><br /><br /></>}
              {paragraph}
            </React.Fragment>
          ))}&rdquo;
        </span>
      </div>
    </div>
  );
} 