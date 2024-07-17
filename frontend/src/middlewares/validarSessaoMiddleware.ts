import { NextRequest, NextResponse } from "next/server";
import { logout, sair, updateSession, validateSession } from "../lib/libauth";
import { redirect } from "next/navigation";
import { dados } from "./dadosMiddleware";

export async function validarSessaoMiddleware(request: NextRequest) {

  const sessionValida = await validateSession(request)

  if (sessionValida && request.nextUrl.pathname === '/login') {
    dados.sessaoValida = true
    return NextResponse.next()
  }

  if (sessionValida || request.nextUrl.pathname === '/login'){
    dados.sessaoValida = false
    return NextResponse.next()
  }

  if (request.nextUrl.pathname !== '/login')
    return NextResponse.redirect(new URL('/login', request.url))
}