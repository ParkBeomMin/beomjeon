"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CreateDocModal from "./components/CreateDocModal";
import { useRouter, useParams } from "next/navigation";
import ClientDocumentDetail from "./components/ClientDocumentDetail";

// window.hljs 타입 정의
declare global {
    interface Window {
        hljs?: {
            highlightElement: (element: HTMLElement) => void;
            highlightBlock?: (element: HTMLElement) => void;
            highlightAll?: () => void;
            configure?: (options: any) => void;
        };
    }
}

// 문서 타입 정의
interface DocType {
    slug: string;
    title: string;
    tags?: string[];
    content?: string;
}

export default function ClientHome({ initialDocs }: { initialDocs: DocType[] }) {
    const router = useRouter();
    const params = useParams();
    const [docs, setDocs] = useState(initialDocs);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLocalEnv, setIsLocalEnv] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState<DocType | null>(null);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [isDetailPage, setIsDetailPage] = useState(false);
    
    // 로컬 환경인지 확인
    useEffect(() => {
        const hostname = window.location.hostname;
        setIsLocalEnv(
            hostname === 'localhost' || 
            hostname === '127.0.0.1' || 
            hostname.includes('.local')
        );
    }, []);
    
    // URL 경로에 따라 현재 선택된 문서 찾기
    useEffect(() => {
        // URL 쿼리 파라미터에서 doc 값 확인
        const searchParams = new URLSearchParams(window.location.search);
        const docParam = searchParams.get('doc');
        
        console.log('docParam',     docParam);
        if (docParam) {
            const doc = docs.find(d => d.slug === decodeURIComponent(docParam));
            console.log('doc', doc);
            if (doc) {
                setSelectedDoc(doc);
                return;
            }
        }
    }, [docs]);
    
    // 복사 완료 메시지 자동 제거
    useEffect(() => {
        if (copiedCode) {
            const timer = setTimeout(() => {
                setCopiedCode(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [copiedCode]);
    
    const filteredDocs = searchQuery 
        ? docs.filter(doc => 
            doc?.title?.toLowerCase?.().includes(searchQuery.toLowerCase()) ||
            (doc?.tags && doc?.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
          )
        : docs;

    const handleCreate = async (path: string, content: string) => {
        const res = await fetch("/api/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path, content }),
        });

        const result = await res.json();
        if (result.success) {
            const segments = path.split("/");
            const title = segments[segments.length - 1];

            const newDoc = {
                slug: path,
                title,
                tags: [],
                content: content || "> 설명을 여기에 작성하세요."
            };

            setDocs([...docs, newDoc]);
            setSelectedDoc(newDoc);
            
        }
        setOpen(false);
    };

    const handleTagClick = (tag: string) => {
        setSearchQuery(tag);
    };

    const handleDocSelect = (doc: DocType) => {
        setSelectedDoc(doc);
        
        // URL 업데이트 (페이지 전환 없이)
        // 쿼리 파라미터 업데이트
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('doc', encodeURIComponent(doc.slug));
        window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
    };
    

    // 코드 하이라이팅 적용
    // useEffect(() => {
    //     if (selectedDoc) {
    //         // DOM이 업데이트된 후 highlight.js 실행
    //         const timer = setTimeout(() => {
    //             try {
    //                 // highlight.js 초기화 시도
    //                 if (typeof window !== 'undefined' && window.hljs) {
    //                     document.querySelectorAll('pre code').forEach((block) => {
    //                         if (window.hljs?.highlightElement) {
    //                             window.hljs.highlightElement(block as HTMLElement);
    //                         } else if (window.hljs?.highlightBlock) {
    //                             window.hljs.highlightBlock(block as HTMLElement);
    //                         }
    //                     });
    //                 }
    //             } catch (e) {
    //                 console.error("코드 하이라이팅 적용 중 오류:", e);
    //             }
    //         }, 100); // DOM 업데이트 후 실행되도록 지연
            
    //         return () => clearTimeout(timer);
    //     }
    // }, [selectedDoc]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* 헤더 섹션 - 상세 페이지에서는 더 작게 표시 */}
                <div className={`text-center ${isDetailPage ? 'mb-6' : 'mb-12'}`}>
                    <h1 className={`${isDetailPage ? 'text-3xl' : 'text-4xl'} font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4`}>
                        범전 문서 라이브러리
                    </h1>
                    {!isDetailPage && (
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            개발 지식과 경험을 체계적으로 정리한 문서 모음입니다
                        </p>
                    )}
                </div>

                {/* 검색 바 - 상세 페이지에서는 숨김 */}
                {!isDetailPage && (
                    <div className="mb-8 max-w-2xl mx-auto">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="문서 검색..."
                                className="w-full p-4 pl-12 pr-10 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                            <svg className="absolute left-4 h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <CreateDocModal
                    open={open}
                    onClose={() => setOpen(false)}
                    onCreate={handleCreate}
                />

                {/* 좌측 사이드바 + 우측 문서 컨텐츠 레이아웃 */}
                <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    {/* 좌측 문서 리스트 사이드바 - 항상 보이게 설정 */}
                    <div className="w-full lg:w-1/4 lg:min-w-[250px] lg:max-w-xs">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-5 sticky top-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-slate-800 dark:text-white">문서 목록</h2>
                                
                                <Link
                                    href="/search"
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
                                >
                                    고급 검색
                                </Link>
                            </div>
                            
                            {filteredDocs.length > 0 ? (
                                <ul className="divide-y divide-slate-100 dark:divide-slate-700 overflow-y-auto max-h-[calc(100vh-240px)]">
                                    {filteredDocs.map((doc) => (
                                        <li 
                                            key={doc?.slug}
                                            className={`py-3 cursor-pointer transition-colors ${
                                                selectedDoc?.slug === doc.slug 
                                                    ? 'bg-blue-50 dark:bg-slate-700 -mx-2 px-2 rounded-lg' 
                                                    : 'hover:bg-slate-50 dark:hover:bg-slate-700'
                                            }`}
                                            onClick={() => handleDocSelect(doc)}
                                        >
                                            <h3 className={`text-base font-medium mb-1 ${
                                                selectedDoc?.slug === doc.slug 
                                                    ? 'text-blue-600 dark:text-blue-400' 
                                                    : 'text-slate-700 dark:text-slate-200'
                                            }`}>
                                                {doc?.title}
                                            </h3>
                                            {doc?.tags && doc?.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    {doc?.tags.map((tag: string) => (
                                                        <span 
                                                            key={tag} 
                                                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleTagClick(tag);
                                                            }}
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center py-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-slate-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-slate-500 dark:text-slate-400">검색 결과가 없습니다</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 우측 문서 내용 표시 영역 */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 lg:p-8">
                            {selectedDoc ? (
                                <div className="prose dark:prose-invert prose-slate w-full max-w-none">
                                    <div className="flex justify-between items-center mb-6">
                                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white m-0">{selectedDoc.title}</h1>
                                    </div>
                                    
                                    <div className="text-slate-700 dark:text-slate-300 overflow-x-auto">
                                        <ClientDocumentDetail slug={selectedDoc.slug} />
                                        {/* {renderMarkdown(selectedDoc.content || '')} */}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="text-xl font-medium text-slate-600 dark:text-slate-400 mb-2">문서를 선택해주세요</h3>
                                    <p className="text-slate-500 dark:text-slate-500 mb-6">좌측 메뉴에서 문서를 선택하거나 검색하세요</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 플로팅 새 문서 만들기 버튼 - 로컬 환경에서만 표시 */}
            {isLocalEnv && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-2xl transition-all hover:scale-105"
                    aria-label="새 문서 만들기"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            )}
        </main>
    );
}
