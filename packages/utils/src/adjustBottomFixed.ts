export function adjustBottomFixed(selector: string) {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;

  let initialHeight = window.innerHeight;

  // 원래의 스타일 보관
  const originalStyle = {
    position: el.style.position || '',
    bottom: el.style.bottom || '',
  };

  function updatePosition() {
    if (!el) return;

    const currentHeight = window.innerHeight;
    const keyboardHeight = initialHeight - currentHeight;

    if (keyboardHeight > 150) {
      el.style.position = 'absolute';
      el.style.bottom = `${keyboardHeight}px`;
    } else {
      // 복구
      el.style.position = originalStyle.position;
      el.style.bottom = originalStyle.bottom;
    }
  }

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', updatePosition);
  } else {
    window.addEventListener('resize', updatePosition);
  }

  window.addEventListener('focusin', updatePosition);
  window.addEventListener('focusout', () => {
    el.style.position = originalStyle.position;
    el.style.bottom = originalStyle.bottom;
  });

  // 혹시 로드 후 다시 높이 초기화가 필요한 경우
  window.addEventListener('load', () => {
    initialHeight = window.innerHeight;
  });
}
