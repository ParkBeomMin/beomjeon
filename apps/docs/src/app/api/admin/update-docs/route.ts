import { NextResponse } from "next/server";
import { updateAllDocsWithLastUpdated } from "@/app/actions/updateDocs";

// 로컬 환경에서만 접근 가능하도록 환경 체크
function isLocalEnvironment(host: string | null): boolean {
    return host === 'localhost' 
        || host === '127.0.0.1' 
        || (host || '').includes('.local');
}

export async function GET(request: Request) {
    const host = request.headers.get("host");
    
    // 로컬 환경에서만 실행 가능
    if (!isLocalEnvironment(host)) {
        return NextResponse.json(
            { error: "이 API는 로컬 환경에서만 접근 가능합니다." },
            { status: 403 }
        );
    }
    
    try {
        const result = await updateAllDocsWithLastUpdated();
        return NextResponse.json(result);
    } catch (error) {
        console.error("문서 업데이트 API 에러:", error);
        return NextResponse.json(
            { error: "문서 업데이트 중 오류가 발생했습니다." },
            { status: 500 }
        );
    }
} 