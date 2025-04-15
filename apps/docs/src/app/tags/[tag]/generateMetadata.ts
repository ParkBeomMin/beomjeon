import { getDocsByTag } from "@/lib/markdown";
import type { Metadata, Viewport } from "next";

// 동적 메타데이터 생성
export async function generateMetadata({ params }: any): Promise<Metadata> {
    const tag = await Promise.resolve(params.tag);
    return {
        title: `#${tag} | 범전 문서`,
        description: `${tag} 태그가 포함된 문서 목록입니다.`,
        keywords: [tag],
    };
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