"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import CopyableCode from "./CopyableCode";
import InteractiveContent from "@/components/InteractiveContent";

type DocType = {
  meta: {
    title: string;
    date?: string;
    lastUpdated?: string;
    tags?: string[];
    description?: string;
  };
  content: string;
};

type PrevNextDocType = {
  slug: string;
  title: string;
};

type DocumentDataType = {
  document: DocType;
  prevDoc: PrevNextDocType | null;
  nextDoc: PrevNextDocType | null;
};

export default function ClientDocumentDetail({ slug }: { slug: string }) {
  const [documentData, setDocumentData] = useState<DocumentDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/document/${encodeURIComponent(slug)}`);
        
        if (!response.ok) {
          throw new Error("문서를 가져오는데 실패했습니다.");
        }
        
        const data = await response.json();
        setDocumentData(data);
      } catch (err) {
        console.error("문서 로딩 오류:", err);
        setError("문서를 가져오는데 문제가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (slug) {
      fetchDocument();
    }
  }, [slug]);
  
  // 하이라이팅 적용
  // useEffect(() => {
  //   // 문서 로딩이 완료되었고, highlight.js가 로드되었는지 확인
  //   if (!isLoading && documentData && typeof window !== 'undefined' && window.hljs) {
  //     // DOM 업데이트 후 실행되도록 지연
  //     const timer = setTimeout(() => {
  //       // contentRef 안의 code 요소 찾기
  //       if (contentRef.current) {
  //         const codeBlocks = contentRef.current.querySelectorAll('pre code');
          
  //         // 각 코드 블록에 하이라이팅 적용
  //         codeBlocks.forEach((block) => {
  //           if (window.hljs?.highlightElement) {
  //             window.hljs.highlightElement(block as HTMLElement);
  //           } else if (window.hljs?.highlightBlock) {
  //             window.hljs.highlightBlock(block as HTMLElement);
  //           } else if (window.hljs?.highlightAll) {
  //             window.hljs.highlightAll();
  //             return; // 모든 블록을 한 번에 처리하므로 반복문 중단
  //           }
  //         });
  //       }
  //     }, 100);
      
  //     return () => clearTimeout(timer);
  //   }
  // }, [isLoading, documentData]);

  if (isLoading) {
    return <div className="py-4 text-center">문서를 불러오는 중...</div>;
  }

  if (error || !documentData) {
    return <div className="py-4 text-center text-red-500">{error || "문서를 찾을 수 없습니다"}</div>;
  }

  const { document, prevDoc, nextDoc } = documentData;
  
  // 작성 날짜 포맷팅
  const formattedDate = document.meta.date 
    ? new Date(document.meta.date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;
    
  // 최종 업데이트 날짜 포맷팅
  const formattedLastUpdated = document.meta.lastUpdated
    ? new Date(document.meta.lastUpdated).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  return (
    <>
      {/* 메타데이터 */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
        {formattedDate && (
          <div className="flex items-center">
            <span className="mr-1">📅</span>
            <time>{formattedDate}</time>
          </div>
        )}
        
        {formattedLastUpdated && (
          <div className="flex items-center">
            <span className="mr-1">🔄</span>
            <time title="최종 업데이트">업데이트: {formattedLastUpdated}</time>
          </div>
        )}
        
        {document.meta.tags && document.meta.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            <span className="mr-1">🏷️</span>
            {document.meta.tags.map((tag: string) => (
              <Link 
                key={tag} 
                href={`/tags/${tag}`}
                className="px-2 py-1 bg-gray-100 text-xs rounded-full hover:bg-gray-200"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* 본문 콘텐츠 */}
      <div className="prose prose-blue max-w-none">
        <InteractiveContent content={document.content} />
        {/* <div dangerouslySetInnerHTML={{ __html: document.content }} /> */}
      </div>  
        <CopyableCode /> {/* ✅ 코드 복사 기능 삽입 */}
          
      {/* 이전/다음 문서 네비게이션 */}
      <div className="mt-12 pt-8 border-t border-gray-200 grid grid-cols-2 gap-4">
        {prevDoc ? (
          <Link href={`/${prevDoc.slug}`} className="flex flex-col p-4 border rounded-lg hover:bg-gray-50">
            <span className="text-sm text-gray-500">이전</span>
            <span className="font-medium text-blue-600">{prevDoc.title}</span>
          </Link>
        ) : <div></div>}
        
        {nextDoc && (
          <Link href={`/${nextDoc.slug}`} className="flex flex-col items-end text-right p-4 border rounded-lg hover:bg-gray-50">
            <span className="text-sm text-gray-500">다음</span>
            <span className="font-medium text-blue-600">{nextDoc.title}</span>
          </Link>
        )}
      </div>
    </>
  );
} 