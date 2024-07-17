import { atualizarSessaoMiddleware, autenticacaoMiddleware, validarSessaoMiddleware } from './middlewares'
import { NextRequest, NextResponse } from 'next/server';
import { handleRotaMiddleware } from './middlewares/handleRotaMiddleware';


export async function middleware(request: NextRequest) {
  let response = NextResponse.next()
  let handleRota = false

  if (request.nextUrl.pathname === '/api/') {
    handleRotaMiddleware(request)
  } else {
    response = await validarSessaoMiddleware(request) || response
    if (response.status === 307) return response

    response = await atualizarSessaoMiddleware(request) || response

    response = await autenticacaoMiddleware(request, response) || response
  }








  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

