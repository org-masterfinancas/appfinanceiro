import { NextRequest, NextResponse } from "next/server";

export async function handleRotaMiddleware(request: NextRequest) {
    return NextResponse.next()
}