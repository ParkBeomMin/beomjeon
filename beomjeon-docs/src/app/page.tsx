import { getAllDocs } from "@/lib/markdown";
import ClientHome from "./ClientHome";

export default function Page() {
    const docs = getAllDocs(); // 서버에서 미리 가져와서
    return <ClientHome initialDocs={docs} />; // 클라이언트 컴포넌트에 전달
}
