import { getDocBySlug, getAllDocs } from "@/lib/markdown";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = decodeURIComponent(params.slug);
  
  try {
    const doc = await getDocBySlug(slug);
    const allDocs = getAllDocs();
    
    // 이전/다음 문서 찾기
    const currentIndex = allDocs.findIndex(d => d.slug === slug);
    const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
    const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;
    
    return NextResponse.json({ 
      document: doc,
      prevDoc,
      nextDoc
    });
  } catch (error) {
    console.error("문서 로딩 오류:", error);
    return NextResponse.json(
      { error: "문서를 찾을 수 없습니다." },
      { status: 404 }
    );
  }
} 