'use client';

import { useEffect, useRef } from 'react';

const LEAVES = ['🍃', '🌿', '🍀', '🌱', '🌾', '🍂', '🌻'];

export default function BgLeaves() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 16; i++) {
      const el = document.createElement('div');
      el.className = 'leaf';
      el.textContent = LEAVES[Math.floor(Math.random() * LEAVES.length)];
      el.style.cssText = `
        left:${Math.random() * 100}%;
        font-size:${1.2 + Math.random() * 2}rem;
        animation-duration:${9 + Math.random() * 10}s;
        animation-delay:${Math.random() * 12}s;
      `;
      container.appendChild(el);
    }
  }, []);

  return <div ref={ref} className="bg-leaves" aria-hidden="true" />;
}
