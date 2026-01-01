'use client';

import { useEffect, useRef, useState } from 'react';

const CURSOR_SIZE = 44;

export function PortalCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleToggle = () => {
      const stored = window.localStorage.getItem('portalCursor');
      setEnabled(stored !== 'off');
    };

    handleToggle();
    window.addEventListener('portal-cursor-toggle', handleToggle as EventListener);

    return () => {
      window.removeEventListener('portal-cursor-toggle', handleToggle as EventListener);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    if (!enabled) {
      document.body.classList.remove('portal-cursor-enabled');
      return;
    }

    document.body.classList.add('portal-cursor-enabled');

    let tick = 0;
    const handleMove = (event: MouseEvent) => {
      positionRef.current = { x: event.clientX, y: event.clientY };
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        tick = (tick + 1) % 2;
        if (tick === 0) {
          const { x, y } = positionRef.current;
          cursor.style.setProperty('--cursor-x', `${x}px`);
          cursor.style.setProperty('--cursor-y', `${y}px`);
        }
        rafRef.current = null;
      });
    };

    window.addEventListener('mousemove', handleMove);
    const handlePulse = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest('[data-portal-pulse="true"]')) return;
      cursor.classList.remove('portal-cursor--pulse');
      void cursor.offsetWidth;
      cursor.classList.add('portal-cursor--pulse');
    };
    window.addEventListener('mousedown', handlePulse);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handlePulse);
      document.body.classList.remove('portal-cursor-enabled');
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled]);

  return (
    <div
      ref={cursorRef}
      className={`portal-cursor ${enabled ? '' : 'portal-cursor--hidden'}`}
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
      }}
      aria-hidden="true"
    >
      <img src="/portal-cursor.gif" alt="" className="portal-cursor__image" />
    </div>
  );
}
