import { BJShareLayer } from './src/bj-share-layer';

if (!customElements.get('bj-share-layer')) {
  customElements.define('bj-share-layer', BJShareLayer);
}
