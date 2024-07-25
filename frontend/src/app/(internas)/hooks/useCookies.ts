'use client'
import { useCallback } from "react"
import Cookies from 'js-cookie';


export default function useCookies() {
    const umDia = 24 * 60 * 60 * 1000

    const setCookies = useCallback(function (chave: string, valor: any) {
        Cookies.set(chave, valor, {
            httpOnly: false,
            path: '/',
            secure: true,
            expires: 1,
        })
    }, [])


    const getCookies = useCallback(function (chave: string) {
        const cookieToken = Cookies.get(chave);
        const token = cookieToken || null
        return token ? token : null
    }, [])

    const delCookies = useCallback(function(){
        Cookies.remove('token')
    }, [])

    return { setCookies, getCookies, delCookies }
}

/*
const setLocalStorage = useCallback(function (chave: string, valor: any) {
    localStorage.setItem(chave, JSON.stringify(valor))
}, [])


const getLocalStorage = useCallback(function (chave: string) {
    const valor = localStorage.getItem(chave)
    return valor ? JSON.parse(valor) : null
}, [])
*/