import Link from "next/link";
import { getDocsByTag } from "@/lib/markdown";

// Next.js App Router의 페이지 컴포넌트
export default function TagPage({ params }: any) {
    const docs = getDocsByTag(params.tag);

    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">🏷️ 태그: {params.tag}</h1>
            {docs.length === 0 && <p>해당 태그에 해당하는 문서가 없습니다.</p>}
            <ul className="space-y-2">
                {docs.map((doc) => (
                    <li key={doc.slug}>
                        <Link
                            href={`/${doc.slug}`}
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
