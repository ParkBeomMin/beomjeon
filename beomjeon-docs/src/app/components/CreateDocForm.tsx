"use client";

import { useState } from "react";

export default function CreateDocForm() {
    const [path, setPath] = useState(""); // 예: react/useMemo
    const [status, setStatus] = useState<
        null | "loading" | "success" | "error"
    >(null);

    const handleSubmit = async () => {
        if (!path.trim()) return;

        setStatus("loading");

        const res = await fetch("/api/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ path }),
        });

        const result = await res.json();
        if (result.success) {
            setStatus("success");
            setPath("");
        } else {
            setStatus("error");
        }
    };

    return (
        <div className="my-6 border border-gray-300 p-4 rounded shadow">
            <h2 className="font-bold text-lg mb-2">🆕 새 문서 만들기</h2>
            <input
                value={path}
                onChange={(e) => setPath(e.target.value)}
                placeholder="예: react/useMemo"
                className="w-full p-2 border rounded mb-2"
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
                생성
            </button>
            {status === "success" && (
                <p className="text-green-600 mt-2">✅ 문서가 생성되었어요!</p>
            )}
            {status === "error" && (
                <p className="text-red-600 mt-2">
                    ❌ 실패했어요. 콘솔을 확인해보세요.
                </p>
            )}
        </div>
    );
}
