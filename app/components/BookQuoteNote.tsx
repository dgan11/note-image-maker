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

  return (
    <div className="book-quote-container">
      <div className="book-title">{title}</div>
      <div className="book-author">{author}</div>
      
      <div className="book-divider">
        <div className="book-divider-icon"></div>
      </div>
      
      <div className="book-quote">
        "{quote}"
      </div>
    </div>
  );
} 