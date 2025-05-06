'use client';

import React, { useState, useRef } from 'react';
import StyledNote from './StyledNote';
import html2canvas from 'html2canvas';

export default function NoteEditor() {
  const [markdown, setMarkdown] = useState(`Looks good. Feels off. Here's why.
By: Elan Miller

A founder told me they used AI to build their brand in 48 hours. Name, deck, site—done by Sunday.

Love that for you.

But, like, do you actually believe in it? Or did you just pick the least cringe option and call it a day?

AI's great at skipping steps, but sometimes those steps are the whole point.

The overthinking. The identity crisis. The moment you realize, 'Oh wait...this means something.'

That's the part that gives you conviction.

Without it, you're just speedrunning your own confusion.

At some point, you've gotta stop asking ChatGPT and start asking yourself.`);
  
  const [isEditing, setIsEditing] = useState(false);
  const noteContainerRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!noteContainerRef.current) return;
    
    try {
      const canvas = await html2canvas(noteContainerRef.current, {
        backgroundColor: '#f0f0f0',
        scale: 2, // Higher quality
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'stylized-note.png';
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="note-editor-container">
      {isEditing ? (
        <div className="editor-view">
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="markdown-editor"
            rows={20}
          />
          <button 
            onClick={() => setIsEditing(false)}
            className="editor-button"
          >
            Preview
          </button>
        </div>
      ) : (
        <div className="preview-view">
          <button 
            onClick={() => setIsEditing(true)}
            className="editor-button"
          >
            Edit
          </button>
          <button
            onClick={handleDownload}
            className="download-button"
          >
            Download
          </button>
          <div className="note-preview-container" ref={noteContainerRef}>
            <StyledNote content={markdown} />
          </div>
        </div>
      )}
    </div>
  );
} 