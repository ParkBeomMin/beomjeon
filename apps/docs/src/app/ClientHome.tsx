"use client";

import { useState } from "react";
import Link from "next/link";
import CreateDocModal from "./components/CreateDocModal";

export default function ClientHome({ initialDocs }: { initialDocs: any[] }) {
    const [docs, setDocs] = useState(initialDocs);
    const [open, setOpen] = useState(false);

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
                },
            ]);
        }
        setOpen(false);
    };

    return (
        <main className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">📚 범전 문서 리스트</h1>

            <button
                onClick={() => setOpen(true)}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                ➕ 새 문서 만들기
            </button>

            <CreateDocModal
                open={open}
                onClose={() => setOpen(false)}
                onCreate={handleCreate}
            />

            <ul className="space-y-2">
                {docs.map((doc) => (
                    <li key={doc.slug}>
                        <Link
                            href={`/${encodeURIComponent(doc.slug)}`}
                            className="text-blue-600 hover:underline"
                        >
                            {doc.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
