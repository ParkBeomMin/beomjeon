import { getAllDocsDetailed } from "@/lib/markdown";
import SearchPage from "./SearchClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문서 검색 | 범전 문서",
  description: "문서를 검색하여 필요한 정보를 빠르게 찾아보세요.",
};

export default async function Page() {
    const docs = getAllDocsDetailed();
    return <SearchPage docs={docs} />;
}
