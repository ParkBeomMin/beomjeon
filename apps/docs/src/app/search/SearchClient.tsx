"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import Link from "next/link";

// 문서 타입 정의
interface DocType {
    slug: string;
    title: string;
    tags: string[];
    content: string;
}

export default function SearchClient({ docs }: { docs: DocType[] }) {
    const [query, setQuery] = useState("");

    const fuse = useMemo(
        () =>
            new Fuse(docs, {
                keys: ["title", "tags", "content"],
                threshold: 0.3,
            }),
        [docs]
    );

    const results = query ? fuse.search(query).map((r) => r.item) : docs;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">🔍 검색</h1>
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />
            <ul className="space-y-2">
                {results.map((doc) => (
                    <li key={doc.slug}>
                        <Link
                            href={`/${doc.slug}`}
                            className="text-blue-600 hover:underline"
                        >
                            {doc.title}
                        </Link>
                        <p className="text-sm text-gray-500">
                            #{doc.tags.join(" #")}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
