import Link from "next/link";
import { getAllTags } from "@/lib/markdown";

export default function TagListPage() {
    const tags = getAllTags();

    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">🏷️ 태그 목록</h1>
            <ul className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <li key={tag}>
                        <Link
                            href={`/tags/${tag}`}
                            className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
                        >
                            #{tag}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
