---
title: BJ Share Layer
tags: [ui]
---

# BJ Share Layer

공유 기능을 제공하는 웹 컴포넌트입니다.

## 사용 방법

```html
<script
    type="module"
    src="https://cdn.jsdelivr.net/npm/@beomjeon/ui-web"
></script>

<bj-share-layer
    platforms="facebook,kakao"
    url="https://beomjeon.dev"
    kakao-key="YOUR_KEY"
    position="bottomsheet"
/>
```

## 속성

- `platforms`: 공유할 플랫폼 목록 (쉼표로 구분)
- `url`: 공유할 URL
- `kakao-key`: 카카오 API 키
- `position`: 레이어 위치 (`center` 또는 `bottomsheet`)

## 예제

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ParkBeomMin/embed/xbbNaaN?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ParkBeomMin/pen/xbbNaaN">
  Untitled</a> by Beom Min Park (<a href="https://codepen.io/ParkBeomMin">@ParkBeomMin</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
