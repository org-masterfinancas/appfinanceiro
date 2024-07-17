import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "../lib/libauth";
import { dados } from "./dadosMiddleware";


export async function autenticacaoMiddleware(request: NextRequest, response: NextResponse) {
  console.log(dados.sessaoValida)
 
  const sessaoEhValida = dados.sessaoValida


  if (sessaoEhValida && request.nextUrl.pathname === '/login')
    return NextResponse.redirect(new URL('/logout', request.url))


  return response

}





/**
 * import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "../lib/libauth";


export async function autenticacaoMiddleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get('session')?.value

  if (!session && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const sessaoEhValida = await validateSession(request)

  if (!sessaoEhValida && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (sessaoEhValida && request.nextUrl.pathname === '/login'){
    return NextResponse.redirect(new URL('/logout', request.url))
  }

  return response

}

 */




















