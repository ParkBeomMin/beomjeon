"use server";

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

/**
 * 모든 마크다운 문서에 lastUpdated 필드가 없으면 추가하는 함수
 */
export async function updateAllDocsWithLastUpdated() {
    try {
        const contentDir = path.join(process.cwd(), "../../content");
        await updateDocsInDirectory(contentDir);
        return { success: true, message: "모든 문서가 업데이트되었습니다." };
    } catch (error) {
        console.error("문서 업데이트 실패:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : String(error) 
        };
    }
}

/**
 * 지정된 디렉토리 및 하위 디렉토리의 모든 마크다운 파일을 재귀적으로 처리
 */
async function updateDocsInDirectory(dirPath: string) {
    // 디렉토리 내용 읽기
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
        const entryPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory()) {
            // 디렉토리면 재귀적으로 처리
            await updateDocsInDirectory(entryPath);
        } else if (entry.name.endsWith('.md')) {
            // 마크다운 파일이면 처리
            await updateDocWithLastUpdated(entryPath);
        }
    }
}

/**
 * 개별 마크다운 파일에 lastUpdated 필드 추가
 */
async function updateDocWithLastUpdated(filePath: string) {
    try {
        // 파일 읽기
        const content = await fs.readFile(filePath, 'utf8');
        const { data, content: docContent } = matter(content);
        
        // lastUpdated 필드가 없으면 추가
        if (!data.lastUpdated) {
            // 현재 시간을 ISO 형식으로 설정
            data.lastUpdated = new Date().toISOString();
            
            // 파일 다시 쓰기
            const updatedContent = matter.stringify(docContent, data);
            await fs.writeFile(filePath, updatedContent, 'utf8');
            console.log(`Updated lastUpdated in: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error updating file ${filePath}:`, error);
        throw error;
    }
} 