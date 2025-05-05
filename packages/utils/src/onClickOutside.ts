export function onClickOutside(
    targetEl: HTMLElement,
    callback: () => void
  ) {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!targetEl.contains(e.target as Node)) {
        callback();
      }
    };
  
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
  
    // 해제 함수 반환
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }
  