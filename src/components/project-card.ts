import { register } from './register';

/**
 * Moves wait for the next frame, so a sweep costs one bounds read and one
 * style write instead of one of each per event. Mouse only, since the
 * spotlight is decoration.
 */
class ProjectCard extends HTMLElement {
  #pending: { x: number; y: number } | undefined;
  #last: { x: number; y: number } | undefined;
  #frame = 0;

  connectedCallback(): void {
    this.addEventListener('pointermove', this.#onMove, { passive: true });
  }

  disconnectedCallback(): void {
    this.removeEventListener('pointermove', this.#onMove);
    if (this.#frame) cancelAnimationFrame(this.#frame);
    this.#frame = 0;
    this.#pending = undefined;
  }

  #onMove = (event: PointerEvent): void => {
    if (event.pointerType !== 'mouse') return;

    this.#pending = { x: event.clientX, y: event.clientY };
    if (this.#frame) return;

    this.#frame = requestAnimationFrame(() => {
      this.#frame = 0;
      const next = this.#pending;
      this.#pending = undefined;
      if (!next) return;

      const bounds = this.getBoundingClientRect();
      const x = next.x - bounds.left;
      const y = next.y - bounds.top;
      if (this.#last && this.#last.x === x && this.#last.y === y) return;

      this.style.setProperty('--spotlight-x', `${x}px`);
      this.style.setProperty('--spotlight-y', `${y}px`);
      this.#last = { x, y };
    });
  };
}

register('project-card', ProjectCard);
