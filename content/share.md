---
title: SNS 공유하기
tags: [SNS, 공유, 소셜 공유, share]
---

## 페이스북(메타) 공유하기

```javascript
const metaShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
const metaHandleClick = () => {
    window.open(metaShareUrl, "_blank", "width=600,height=400");
};
```

## 트위터(X) 공유하기

```javascript
const XShareUrl = `https://twitter.com/share?url=${encodeURIComponent(pageUrl)}`;
const XHandleClick = () => {
    window.open(XShareUrl, "_blank", "width=600,height=400");
};
```

## 카카오톡 공유하기

```javascript
// 카카오 초기화(react 환경에서는 useEffect 내에서 처리)
const { Kakao } = window;
if (!window.Kakao.isInitialized()) {
    window.Kakao.init("YOUR_KAKAO_APP_KEY"); // 여기에 본인의 Kakao JavaScript 키를 입력하세요.
}

const shareToKakao = () => {
    window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
            title: data.title,
            description: data.description,
            imageUrl: data.imgUrl,
            link: {
                mobileWebUrl: pageUrl,
                webUrl: pageUrl,
            },
        },
        buttons: [
            {
                title: "웹으로 보기",
                link: {
                    mobileWebUrl: pageUrl,
                    webUrl: pageUrl,
                },
            },
        ],
    });
};
```

## 라인 공유하기

```javascript
const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(pageUrl)}`;
window.open(lineUrl, "_blank");
```

## 페이스북 메신저 공유하기

```javascript
const messengerUrl = `https://www.facebook.com/dialog/send?app_id=${appId}&link=${encodeURIComponent(pageUrl)}`;
window.open(messengerUrl, "_blank");
```

딥 링크로 공유하기
관리자에서 키 설정 필요 없음
페이스북 메신저 앱이 깔려 있어야 동작함

```javascript
const messengerUrl = `fb-messenger://share?link=${encodeURIComponent(pageUrl)}`;
window.open(messengerUrl, "_blank");
```

## 카카오 스토리 공유하기

[지원종료|https://devtalk.kakao.com/t/url/132327]

## 네이버 블로그 공유하기

더블 인코딩을 해야함.
네이버 내부 렌더링 시 &가 &amp;로 변경되어 파라미터 손상됨.

```javascript
const shareUrl = `https://share.naver.com/web/shareView.nhn?url=${encodeURIComponent(encodeURIComponent(pageUrl))}&title=${encodeURIComponent(title)}`;
window.open(shareUrl, "_blank");
```

## 핀터레스트 공유하기

```javascript
const shareToPinterest = () => {
    const shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&media=${encodeURIComponent(data.imgUrl)}&description=${encodeURIComponent(data?.title)}`;
    // const shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(description)}`;
    window.open(shareUrl, "_blank");
};
```
