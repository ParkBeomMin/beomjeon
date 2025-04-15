"use client";

import { useEffect, useState } from "react";

export default function CreateDocModal({
    open,
    onClose,
    onCreate,
}: {
    open: boolean;
    onClose: () => void;
    onCreate: (path: string, content: string) => void;
}) {
    const [path, setPath] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (open) {
            setPath("");
            setContent("");
        }
    }, [open]);

    if (!open) return null;

    const handleSubmit = () => {
        if (!path.trim()) return;
        onCreate(path, content);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">새 문서 만들기</h2>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        문서 경로
                    </label>
                    <input
                        value={path}
                        onChange={(e) => setPath(e.target.value)}
                        placeholder="예: react/useMemo"
                        className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                
                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        문서 내용
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="본문 내용을 입력하세요..."
                        rows={6}
                        className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
                
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:shadow-lg transition-all"
                    >
                        생성
                    </button>
                </div>
            </div>
        </div>
    );
}
