import { describe, it, expect, beforeEach } from 'vitest';
import '../src/bj-share-layer';
import { BJShareLayer } from '../src/bj-share-layer';

describe('<bj-share-layer>', () => {
  let element: BJShareLayer;

  beforeEach(() => {
    document.body.innerHTML = `
      <bj-share-layer
        platforms="facebook"
        url="https://beomjeon.dev"
      ></bj-share-layer>
    `;
    element = document.querySelector('bj-share-layer')!;
  });

  it('should be defined and visible when open is called', () => {
    expect(element).toBeDefined();
    element.open();
    expect(getComputedStyle(element).display).toBe('block');
  });

  it('should generate a facebook button', () => {
    const shadowButtons = element.shadowRoot?.querySelectorAll('.social-button');
    expect(shadowButtons?.length).toBe(1);
    expect(shadowButtons?.[0].textContent).toContain('Facebook');
  });
});
