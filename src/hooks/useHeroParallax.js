import { useEffect } from 'react';

export function useHeroParallax(heroRef, orbRef, gridRef) {
  useEffect(() => {
    const hero = heroRef?.current;
    const orb = orbRef?.current;
    const grid = gridRef?.current;
    if (!hero || !orb || !grid) return;

    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0) {
        const p = Math.max(0, -rect.top / rect.height);
        orb.style.transform = `translate(-50%,calc(-50% + ${p * 80}px)) scale(${1 + p * 0.1})`;
        grid.style.transform = `translateY(${p * 40}px)`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [heroRef, orbRef, gridRef]);
}
