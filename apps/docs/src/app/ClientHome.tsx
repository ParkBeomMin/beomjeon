"use client";

import { useState } from "react";
import Link from "next/link";
import CreateDocModal from "./components/CreateDocModal";

export default function ClientHome({ initialDocs }: { initialDocs: any[] }) {
    const [docs, setDocs] = useState(initialDocs);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    
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

            setDocs([
                ...docs,
                {
                    slug: path,
                    title,
                    tags: [],
                    content: content || "> 설명을 여기에 작성하세요."
                },
            ]);
        }
        setOpen(false);
    };

    const handleTagClick = (tag: string) => {
        setSearchQuery(tag);
    };

    return (
        <main className="max-w-2xl mx-auto p-8 relative min-h-screen">
            <h1 className="text-3xl font-bold mb-6">📚 범전 문서 리스트</h1>

            <div className="mb-6 flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="문서 검색..."
                        className="w-full p-2 pr-10 border rounded"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    )}
                </div>
                
                <Link
                    href="/search"
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 flex items-center justify-center"
                >
                    🔍 고급 검색
                </Link>
            </div>

            <CreateDocModal
                open={open}
                onClose={() => setOpen(false)}
                onCreate={handleCreate}
            />

            <ul className="space-y-2">
                {filteredDocs.length > 0 ? (
                    filteredDocs.map((doc) => (
                        <li key={doc?.slug}>
                            <Link
                                href={`/${encodeURIComponent(doc?.slug)}`}
                                className="text-blue-600 hover:underline"
                            >
                                {doc?.title}
                            </Link>
                            {doc?.tags && doc?.tags.length > 0 && (
                                <span className="ml-2 text-sm text-gray-500">
                                    {doc?.tags.map((tag: string) => (
                                        <span 
                                            key={tag} 
                                            className="mr-1 bg-gray-100 px-1 rounded cursor-pointer hover:bg-gray-200"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleTagClick(tag);
                                            }}
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </span>
                            )}
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">검색 결과가 없습니다.</p>
                )}
            </ul>
            
            {/* 플로팅 새 문서 만들기 버튼 */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center text-2xl transition-all hover:scale-110"
                aria-label="새 문서 만들기"
            >
                ➕
            </button>
        </main>
    );
}
