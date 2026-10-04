import { once, reducedMotion, supported } from './observers';
import { register } from './register';

const start = (host: HTMLElement): void => {
  const video = host.querySelector('video');
  const source = video?.querySelector<HTMLSourceElement>('source[data-src]');
  const url = source?.dataset.src;
  if (!video || !source || !url) return;

  source.src = url;
  source.removeAttribute('data-src');
  video.load();
  void video.play().catch(() => undefined);
};

/**
 * `poster` and `preload="none"` in the markup are what hold the video bytes
 * back until `start` runs. Change either one and this file has to follow.
 */
class DeferredMedia extends HTMLElement {
  connectedCallback(): void {
    if (reducedMotion) return;

    if (!supported || this.dataset.loading === 'eager') {
      start(this);
      return;
    }

    once('media', this, () => start(this));
  }
}

register('deferred-media', DeferredMedia);
