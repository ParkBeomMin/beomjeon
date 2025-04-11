import { getDocBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import CopyableCode from "@@/components/CopyableCode";

// Next.js 14 App Router에 맞게 간단하게 타입 정의
export default async function DocPage({
  params,
}: {
  params: { slug: string[] };
}) {
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
