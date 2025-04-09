---
title: useEffect 훅
tags: [react, hook]
---

`useEffect`는 컴포넌트가 렌더링될 때마다 특정 작업을 수행할 수 있게 해주는 훅이다.

```tsx
useEffect(() => {
    console.log("컴포넌트가 마운트됨");

    return () => {
        console.log("컴포넌트가 언마운트됨");
    };
}, []);
```
