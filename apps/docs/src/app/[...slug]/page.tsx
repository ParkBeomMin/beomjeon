import { getDocBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import CopyableCode from "@@/components/CopyableCode";

// JSX.Element 타입으로 명시적 타입 선언을 하지 않습니다
export default async function DocPage({ params }: any) {
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
