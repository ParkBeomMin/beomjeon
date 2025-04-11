import { getDocBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import CopyableCode from "@@/components/CopyableCode";

// Next.js의 PageProps 타입과 호환되도록 타입 정의 수정
interface PageProps {
    params: {
        slug: string[];
    };
    searchParams: Record<string, string | string[] | undefined>;
}

export default async function DocPage({ params }: PageProps) {
    const slugPath = params.slug.join("/");
    try {
        const doc = await getDocBySlug(slugPath);
        return (
            <div className="prose mx-auto p-8 relative">
                <h1>{doc.meta.title}</h1>
                <CopyableCode /> {/* ✅ 코드 복사 기능 삽입 */}
                <div dangerouslySetInnerHTML={{ __html: doc.content }} />
            </div>
        );
    } catch {
        notFound();
    }
}
