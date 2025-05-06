'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface StyledNoteProps {
  content: string;
}

export default function StyledNote({ content }: StyledNoteProps) {
  const processContent = (content: string) => {
    // Extract title and byline if present
    let title = '';
    let byline = '';
    let processedContent = content;

    // Look for title pattern (first line followed by a byline)
    const lines = content.split('\n');
    if (lines.length >= 2 && lines[1].trim().startsWith('By:')) {
      title = lines[0].trim();
      byline = lines[1].trim();
      // Remove title and byline from content
      processedContent = lines.slice(2).join('\n').trim();
    }

    return { title, byline, processedContent };
  };

  const { title, byline, processedContent } = processContent(content);

  return (
    <div className="note-container">
      {title && <h1 className="note-title">{title}</h1>}
      {byline && <div className="note-byline">{byline}</div>}
      <div className="note-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {processedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
} 