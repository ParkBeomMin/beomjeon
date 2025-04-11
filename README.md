# 📘 Project: BeomJeon

나만의 개발 지식 위키, 툴킷, UI 라이브러리를 모아놓은 **개발자 개인 문서 & 도구 플랫폼**입니다.  
문서 정리부터 CLI 자동화, 컴포넌트화, 라이브러리화까지 확장 가능한 구조로 설계되었습니다.

---

## 💡 프로젝트 소개

BeomJeon(범전)은 다음을 목표로 합니다:

-   📚 개발 중 자주 사용하는 지식/코드 정리
-   📦 유틸 함수, 컴포넌트, CLI 도구를 재사용 가능한 모듈로 관리
-   🔍 검색 가능한 마크다운 위키로 개발 정보 접근성 향상
-   🧠 모든 것이 버전 관리되고 자동화된 "나만의 개발 레퍼런스"

---

## 🎯 프로젝트 목표

-   ✅ 위키 기반 문서 작성 및 검색
-   ✅ CLI로 빠른 문서 생성 (`npx beomjeon new react/useEffect`)
-   ✅ 재사용 가능한 유틸 함수 라이브러리 (`@beomjeon/utils`)
-   ✅ (예정) 컴포넌트 라이브러리 (`@beomjeon/ui`)
-   ✅ (예정) 문서 에디터, 컴포넌트 미리보기, 배포 자동화 등

---

## 🗂 프로젝트 구조

<details>
<summary>📁 폴더 구조 펼쳐보기</summary>

```bash
beomjeon/
├── apps/
│   └── docs/                  # Next.js 기반 위키 앱 (범전)
│       └── src/
│           └── app/
│
├── packages/
│   ├── utils/                 # @beomjeon/utils - 재사용 유틸 함수
│   └── ui/                    # (예정) @beomjeon/ui - React 컴포넌트
│
├── content/                   # .md 문서 저장소 (위키 내용)
│   └── react/
│       └── useEffect.md
│
├── cli/                       # npx beomjeon new ... CLI 기능
│   └── index.js
│
├── tsconfig.json              # 공통 타입스크립트 설정
├── package.json               # 루트 패키지 + 워크스페이스
├── pnpm-workspace.yaml        # (또는 turbo.json)
└── README.md
```

</details>

---
