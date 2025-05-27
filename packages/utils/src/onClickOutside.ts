export function onClickOutside(
    targetEl: HTMLElement | HTMLElement[] | string | string[],
    callback: () => void
  ) {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (Array.isArray(targetEl)) {
        targetEl.forEach(el => {
          if (el instanceof HTMLElement && !el.contains(e.target as Node)) {
            callback()
          } else if (typeof el === 'string') {
            const element = document.querySelector(el)
            if (element && !element.contains(e.target as Node)) {
              callback()
            }
          }
        })
      }
      if (typeof targetEl === 'string') {
        const element = document.querySelector(targetEl)
        if (element && !element.contains(e.target as Node)) {
          callback()
        }
      } else if (targetEl instanceof HTMLElement && !targetEl.contains(e.target as Node)) {
        callback();
      }
    };
  
    document.addEventListener('touchstart', handler);
    document.addEventListener('click', handler);
  
    const cleanup = () => {
      document.removeEventListener('touchstart', handler);
      document.removeEventListener('click', handler);
    };

    // popstate 이벤트로 URL 변경 감지
    window.addEventListener('popstate', cleanup);
    
    // pushState와 replaceState 메서드 오버라이드
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function() {
      originalPushState.apply(this, arguments as any);
      cleanup();
    };

    window.history.replaceState = function() {
      originalReplaceState.apply(this, arguments as any);
      cleanup();
    };
  }
  