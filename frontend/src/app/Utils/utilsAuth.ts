import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import RequisicaoApi from '../requisicao/requisicaoApiFuncao';

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);
const requisicao = RequisicaoApi()

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 minute from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;

  } catch (error) {
    return false
  }

}

export async function login(formData: FormData) {

  const usuario = { email: formData.get("email"), senha: formData.get('senha') };
  const { email } = usuario

  const credencial = await requisicao.httpPost('/login', formData)

  if (!credencial) return false
  
  const expires = new Date(Date.now() + 10 * 60 * 6000);
  const session = await encrypt({ email, expires, credencial });

  cookies().set("session", session, { expires, httpOnly: true });
  return true
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  
  if (!session) return sair(request)

  const parsed = await decrypt(session);

  parsed.expires = new Date(Date.now() + 10 * 60 * 6000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function validateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value
  if (!session) return false

  const parsed = await decrypt(session);
  if (!parsed) {
    return false
  }
  return true
}

export function sair(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.url))
  response.cookies.delete('session')
  return response
}