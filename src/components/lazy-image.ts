import { once, supported } from './observers';
import { register } from './register';

const load = (image: HTMLImageElement): void => {
  if (image.dataset.srcset) image.srcset = image.dataset.srcset;
  else if (image.dataset.src) image.src = image.dataset.src;
  image.removeAttribute('data-src');
  image.removeAttribute('data-srcset');
};

/**
 * `index.html` ships the real URL in a `<noscript>` sibling too, and a rule in
 * the head hides the placeholder there, so a no-JS visitor sees one image.
 */
class LazyImage extends HTMLImageElement {
  connectedCallback(): void {
    if (!supported) {
      load(this);
      return;
    }
    once('image', this, () => load(this));
  }
}

register('lazy-image', LazyImage, { extends: 'img' });
