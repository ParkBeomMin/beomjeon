import { getDocBySlug, getAllDocs } from "@/lib/markdown";
import { notFound } from "next/navigation";
import CopyableCode from "@@/components/CopyableCode";
import Link from "next/link";
import InteractiveContent from '@/components/InteractiveContent';

// 외부에서 메타데이터와 뷰포트 설정 가져오기
export { generateMetadata, generateViewport } from "./generateMetadata";

// Next.js App Router의 페이지 컴포넌트
export default async function DocPage({ params }: any) {
    // Promise로 변환하여 await 사용
    const slug = await Promise.resolve(params.slug);
    const slugPath = slug.join("/");
    
    try {
        const doc = await getDocBySlug(slugPath);
        const allDocs = getAllDocs();
        
        // 이전/다음 문서 찾기
        const currentIndex = allDocs.findIndex(d => d.slug === slugPath);
        const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
        const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;
        
        // 작성 날짜 포맷팅
        const formattedDate = doc.meta.date 
            ? new Date(doc.meta.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : null;
            
        // 최종 업데이트 날짜 포맷팅
        const formattedLastUpdated = doc.meta.lastUpdated
            ? new Date(doc.meta.lastUpdated).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : null;

        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* 네비게이션 */}
                <div className="mb-8 flex items-center text-sm text-gray-500">
                    <Link href="/" className="hover:text-blue-600">
                        홈
                    </Link>
                    <span className="mx-2">›</span>
                    <span className="text-gray-900">{doc.meta.title}</span>
                </div>
                
                {/* flex-col md:flex-row 레이아웃 제거하고 아티클만 표시 */}
                <article className="w-full">
                    <header className="mb-8 pb-4 border-b border-gray-200">
                        <h1 className="text-3xl font-bold mb-4">{doc.meta.title}</h1>
                        
                        {/* 메타데이터 */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
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
                            
                            {doc.meta.tags && doc.meta.tags.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1">
                                    <span className="mr-1">🏷️</span>
                                    {doc.meta.tags.map((tag: string) => (
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
                    </header>
                    
                    {/* 본문 콘텐츠 */}
                    <div className="prose prose-blue max-w-none">
                        <CopyableCode />
                        <InteractiveContent content={doc.content} />
                    </div>
                </article>
                
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
            </div>
        );
    } catch (error) {
        console.error("문서 로딩 오류:", error);
        notFound();
    }
}
