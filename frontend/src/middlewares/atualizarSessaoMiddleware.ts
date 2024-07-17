import { NextRequest, NextResponse } from "next/server";
import { logout, updateSession } from "../lib/libauth";
import { dados } from "./dadosMiddleware";


export async function atualizarSessaoMiddleware(request: NextRequest) {

  if (request.nextUrl.pathname === '/login')
    return NextResponse.next()

  return await updateSession(request)

}