// 카카오 SDK 타입 선언
declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      Share: {
        sendDefault: (options: any) => void;
      };
    };
  }
}
const TEMPLATE = document.createElement('template');

TEMPLATE.innerHTML = `
  <style>
    :host {
      position: fixed;
      display: none;
      z-index: 1000;
    }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
    }
    .wrapper {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-width: 240px;
      position: relative;
    }
    :host([data-position="center"]) {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    :host([data-position="bottomsheet"]) {
      bottom: 0;
      left: 0;
      width: 100%;
      border-radius: 16px 16px 0 0;
    }
    .social-button {
      padding: 10px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
    }
    .social-button.kakao { background: #fee500; color: #000; }
    .social-button.facebook { background: #1877f2; color: #fff; }
    .social-button.pinterest { background: #e60023; color: #fff; }
  </style>
  <div class="overlay"></div>
  <div class="wrapper"></div>
`;

export class BJShareLayer extends HTMLElement {
  static get observedAttributes() {
    return ['platforms', 'url', 'kakao-key', 'class', 'position'];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(TEMPLATE.content.cloneNode(true));
  }

  connectedCallback() {
    this.renderButtons();
    this.applyAttributes();
    this.attachEvents();
  }

  attributeChangedCallback(name: string, _oldVal: string, _newVal: string) {
    this.applyAttributes();
    if (name === 'platforms') this.renderButtons();
  }

  applyAttributes() {
    const wrapper = this.shadowRoot?.querySelector('.wrapper') as HTMLElement;
    const position = this.getAttribute('position') || 'center';
    this.setAttribute('data-position', position);

    const className = this.getAttribute('class');
    if (className) {
      wrapper.className = `wrapper ${className}`;
    }
  }

  renderButtons() {
    const wrapper = this.shadowRoot?.querySelector('.wrapper') as HTMLElement;
    const platforms = (this.getAttribute('platforms') || '').split(',').map(p => p.trim());
    const url = this.getAttribute('url') || window.location.href;

    wrapper.innerHTML = '';

    platforms.forEach(platform => {
      const btn = document.createElement('button');
      btn.className = `social-button ${platform}`;
      btn.dataset.platform = platform;
      btn.textContent = platform.charAt(0).toUpperCase() + platform.slice(1);
      btn.onclick = () => this.share(platform, url);
      wrapper.appendChild(btn);
    });
  }

  share(platform: string, url: string) {
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'pinterest':
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'kakao':
        this.shareToKakao(url);
        break;
    }
    this.close();
  }

  shareToKakao(url: string) {
    const kakaoKey = this.getAttribute('kakao-key');
    if (!window.Kakao && kakaoKey) {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
      script.onload = () => {
        window.Kakao.init(kakaoKey);
        window.Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: '공유하기',
            description: '범전에서 공유된 콘텐츠입니다.',
            imageUrl: '',
            link: { mobileWebUrl: url, webUrl: url },
          },
        });
      };
      document.head.appendChild(script);
    } else if (window.Kakao && kakaoKey) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '공유하기',
          description: '범전에서 공유된 콘텐츠입니다.',
          imageUrl: '',
          link: { mobileWebUrl: url, webUrl: url },
        },
      });
    }
  }

  open() {
    this.style.display = 'block';
  }

  close() {
    this.style.display = 'none';
  }

  attachEvents() {
    const overlay = this.shadowRoot?.querySelector('.overlay');
    overlay?.addEventListener('click', () => this.close());

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }
}

customElements.define('bj-share-layer', BJShareLayer);
