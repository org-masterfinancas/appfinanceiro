'use server'
import { cookies } from 'next/headers'

export async function cookiesInserirToken(token: string) {
    const umDia = 24 * 60 * 60 * 1000

    cookies().set({
        name: 'token',
        value: token,
        httpOnly: false,
        path: '/',
        secure: true,
        expires: Date.now() + umDia
    })
}

export async function cookiesRemoverToken() {
    cookies().delete('token')
}

export async function cookiesObterToken() {
    const cookiesToken = cookies().get('token')
    const token = cookiesToken ? cookiesToken.value : null

    if (token === null) {
        return false
    } else {
        return token

    }
}
