import { once, reducedMotion, supported } from './observers';

/**
 * Headings, copy and cards that do not need an element of their own opt in
 * with `data-reveal` or `data-word-reveal` instead.
 */
for (const host of document.querySelectorAll<HTMLElement>('[data-reveal], [data-word-reveal]')) {
  if (reducedMotion || !supported) {
    host.setAttribute('data-visible', '');
  } else {
    document.documentElement.dataset.motion = 'ready';
    once('reveal', host, () => host.setAttribute('data-visible', ''));
  }
}
