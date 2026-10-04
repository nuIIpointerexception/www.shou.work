const REVEAL = { threshold: 0.08, rootMargin: '0px 0px -4% 0px' };
const IMAGE = { threshold: 0.01, rootMargin: '600px 0px' };
const MEDIA = { threshold: 0.01, rootMargin: '300px 0px' };

const SEEN = 'seenne';
const ready = new Event(SEEN);

const make = (options: IntersectionObserverInit): IntersectionObserver => {
  const o = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      o.unobserve(entry.target);
      entry.target.dispatchEvent(ready);
    }
  }, options);
  return o;
};

const observers = { reveal: make(REVEAL), image: make(IMAGE), media: make(MEDIA) };

export const once = (p: 'reveal' | 'image' | 'media', t: Element, cb: () => void): void => {
  t.addEventListener(SEEN, cb, { once: true });
  observers[p].observe(t);
};

export const supported = typeof window.IntersectionObserver === 'function';
export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
