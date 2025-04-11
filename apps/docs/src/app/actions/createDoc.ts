"use server";

import fs from "fs/promises";
import path from "path";
export async function createDoc(inputPath: string, bodyContent: string = "") {
    try {
        const contentDir = path.join(process.cwd(), "../../content");
        const fullPath = path.join(contentDir, `${inputPath}.md`);

        const segments = inputPath.split("/");
        const title = segments[segments.length - 1];
        
        // 현재 시간을 ISO 형식으로 생성
        const currentDate = new Date().toISOString();

        const template = `---
  title: ${title}
  tags: []
  lastUpdated: ${currentDate}
---
  
  ${bodyContent || "> 설명을 여기에 작성하세요."}
  `;

        await fs.mkdir(path.dirname(fullPath), { recursive: true });
        await fs.writeFile(fullPath, template, "utf-8");

        return { success: true };
    } catch (e: unknown) {
        console.error("문서 생성 실패:", e);
        return { success: false, error: e instanceof Error ? e.message : String(e) };
    }
}
