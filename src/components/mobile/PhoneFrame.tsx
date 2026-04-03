'use client';

import { useEffect, useState } from 'react';

const PHONE_W = 393;
const PHONE_H = 852;
const BEZEL = 12;
const FRAME_W = PHONE_W + BEZEL * 2;
const FRAME_H = PHONE_H + BEZEL * 2;

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function calc() {
      const mobileViewport = window.matchMedia('(max-width: 768px)').matches;

      if (mobileViewport) {
        setScale(1);
        return;
      }

      const maxH = window.innerHeight - 40; // 20px padding top+bottom
      const maxW = window.innerWidth - 32;
      const s = Math.min(1, maxH / FRAME_H, maxW / FRAME_W);
      setScale(s);
    }
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  return (
    <div className="phone-backdrop">
      <div
        className="phone-frame"
        style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
      >
        {/* Dynamic Island */}
        <div className="phone-notch">
          <div className="phone-dynamic-island" />
        </div>

        {/* Screen */}
        <div className="phone-screen hide-scrollbar">
          {children}
        </div>

        {/* Home indicator */}
        <div className="phone-home-indicator-area">
          <div className="phone-home-indicator" />
        </div>
      </div>
    </div>
  );
}
