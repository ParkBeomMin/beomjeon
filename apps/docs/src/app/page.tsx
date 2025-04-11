import { getAllDocsDetailed } from "@/lib/markdown";
import ClientHome from "./ClientHome";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "범전 문서 | 개발 지식 저장소",
  description: "개발자 범전이 공유하는 기술 문서 모음",
};

export default function Page() {
    const docs = getAllDocsDetailed(); // 서버에서 미리 가져와서
    return <ClientHome initialDocs={docs} />; // 클라이언트 컴포넌트에 전달
}
