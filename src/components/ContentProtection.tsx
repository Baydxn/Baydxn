import React, { useEffect, useState } from 'react';

export const ContentProtection: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: number;

    const handleContextMenu = (e: MouseEvent) => {
      // Allow context menu only inside inputs and textareas for accessibility
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
      setToastMessage('© Bayd XN — Crafted with code & design. All rights reserved.');
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setToastMessage(null);
      }, 2500);
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.classList.contains('protected-asset')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!toastMessage) return null;

  return (
    <div 
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-zinc-900/90 text-zinc-200 border border-zinc-700/80 backdrop-blur-md shadow-2xl text-xs font-mono tracking-wide flex items-center gap-2 pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
      role="status"
      aria-live="polite"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      <span>{toastMessage}</span>
    </div>
  );
};
