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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
                <h2 className="text-lg font-bold mb-4">🆕 새 문서 만들기</h2>
                <input
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    placeholder="예: react/useMemo"
                    className="w-full p-2 border rounded mb-4"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="본문 내용을 입력하세요..."
                    rows={6}
                    className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded border hover:bg-gray-100"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        생성
                    </button>
                </div>
            </div>
        </div>
    );
}
