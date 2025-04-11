#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2); // [ 'new', 'react/useMemo' ]

const command = args[0];
const target = args[1];

if (command !== "new" || !target) {
    console.error("❗ 사용법: npx beomjeon new react/useMemo");
    process.exit(1);
}

const contentDir = path.join(__dirname, "../content");
const fullPath = path.join(contentDir, `${target}.md`);

const segments = target.split("/");
const title = segments[segments.length - 1];

const template = `---
title: ${title}
tags: []
---

> 설명을 여기에 작성하세요.
`;

fs.mkdirSync(path.dirname(fullPath), { recursive: true });
fs.writeFileSync(fullPath, template, { encoding: "utf-8" });

console.log(`✅ 문서가 생성되었습니다: content/${target}.md`);
