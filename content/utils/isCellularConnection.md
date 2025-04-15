---
title: isCellularConnection
tags: [utils, cellular, 셀룰러, 모바일]
---

> 모바일 네트워크 연결 상태를 확인하는 유틸리티 함수

⚠️ 주의: ios는 브라우저에서 지원해주지 않기 때문에 모바일 네트워크 연결 상태를 확인할 수 없다.

## 📦Install

```bash
npm install @beomjeon/utils

pnpm install @beomjeon/utils

bun install @beomjeon/utils

yarn install @beomjeon/utils
```

## 📚Usage

| 파라미터 | 타입 | 설명 |
| -------- | ---- | ---- |
| -        | -    | -    |

| 리턴       | 타입    | 설명                                                         |
| ---------- | ------- | ------------------------------------------------------------ |
| isCellular | boolean | 셀룰러 네트워크 연결 상태면 true, 아니면 false를 반환합니다. |

```javascript
import { isCellularConnection } from "@beomjeon/utils";

const isCellular = isCellularConnection();
```
