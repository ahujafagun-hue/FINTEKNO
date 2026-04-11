import { useEffect, useRef } from 'react';

const SELECTOR = '.feat-card, .agent-block, .t-card, .price-card, .step';

/** Scroll-reveal + hero stat counters (matches original prototype behaviour). */
export function useLandingSectionAnimations(enabled) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!enabled || !rootRef.current) return;
    const root = rootRef.current;

    const els = root.querySelectorAll(SELECTOR);
    els.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));

    const statVals = root.querySelectorAll('.hero-stats .stat-val');
    const stats = [
      { target: 42, format: (n) => `${Math.round(n)}×`, aria: '42 times' },
      { target: 2, format: (n) => `${Math.round(n)} min`, aria: '2 minutes' },
      { target: 0, format: (n) => `${Math.round(n)}%`, aria: 'zero percent' },
      { target: 3, format: (n) => `${Math.round(n)}×`, aria: '3 times' },
    ];

    const statTimers = [];
    const statsIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          statsIo.disconnect();
          statVals.forEach((el, i) => {
            const { target, format, aria } = stats[i];
            el.setAttribute('aria-label', aria);
            let start = 0;
            const dur = 1200;
            const stepMs = 16;
            const inc = target / (dur / stepMs);
            const t = setInterval(() => {
              start += inc;
              if (start >= target) {
                start = target;
                clearInterval(t);
              }
              el.textContent = format(start);
            }, stepMs);
            statTimers.push(t);
          });
        });
      },
      { threshold: 0.2 },
    );

    const heroStats = root.querySelector('.hero-stats');
    if (heroStats) statsIo.observe(heroStats);

    return () => {
      io.disconnect();
      statsIo.disconnect();
      statTimers.forEach(clearInterval);
    };
  }, [enabled]);

  return rootRef;
}
