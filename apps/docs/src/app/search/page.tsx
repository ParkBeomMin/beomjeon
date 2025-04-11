import { getAllDocsDetailed } from "@/lib/markdown";
import SearchPage from "./SearchClient";

export default async function Page() {
    const docs = getAllDocsDetailed();
    return <SearchPage docs={docs} />;
}
