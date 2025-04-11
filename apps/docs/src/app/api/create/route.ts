import { NextResponse } from "next/server";
import { createDoc } from "@/app/actions/createDoc";

export async function POST(req: Request) {
    const { path, content } = await req.json();
    const result = await createDoc(path, content);
    return NextResponse.json(result);
}
