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

<div class="example">
  <script type="module" src="https://cdn.jsdelivr.net/npm/@beomjeon/ui-web"></script>
  <script>
    const openBjShareLayer = () => {
        document.querySelector('bj-share-layer')?.open();
    }
    console.log(123123)
  </script>

<button style="border: solid 1px grey; border-radius: 8px; cursor: pointer" onclick="console.log(document.querySelector('bj-share-layer'));document.querySelector('bj-share-layer')?.open();console.log(111)">
    open bj-share-layer🪄
</button>

<bj-share-layer
    platforms="facebook,kakao"
    url="https://beomjeon.dev"
    kakao-key="YOUR_KEY"
    position="bottomsheet"
  />

</div>

<style>
.example {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
}
</style>
