import { getDocBySlug } from "@/lib/markdown";
import type { Metadata, Viewport } from "next";

// 동적 메타데이터 생성
export async function generateMetadata({ params }: any): Promise<Metadata> {
    // Promise로 변환하여 await 사용
    const slug = await Promise.resolve(params.slug);
    const slugPath = slug.join("/");
    
    try {
        const doc = await getDocBySlug(slugPath);
        return {
            title: `${doc.meta.title || slugPath} | 범전 문서`,
            description: doc.meta.description || `${doc.meta.title || slugPath}에 대한 기술 문서`,
            keywords: doc.meta.tags || [],
        };
    } catch {
        return {
            title: "문서를 찾을 수 없음 | 범전 문서",
            description: "요청하신 문서를 찾을 수 없습니다.",
        };
    }
}

// 동적 뷰포트 설정
export async function generateViewport(): Promise<Viewport> {
    return {
        themeColor: [
            { media: "(prefers-color-scheme: light)", color: "#ffffff" },
            { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
        ],
    };
} 