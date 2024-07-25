'use client'
import { createContext, useContext, useEffect, useState } from "react"
import { ContextoToken } from "./ContextoToken"
import decodificarJwt from '../../Utils/utilsJwt'
import useCookies from "@/app/(internas)/hooks/useCookies"
import RequisicaoApi from "@/app/requisicao/requisicaoApi"
import { cookiesInserirToken, cookiesObterToken, cookiesRemoverToken } from "@/app/serverActions/actionsCookies"

const ContextoUsuario = createContext<any>({})
export { ContextoUsuario }

const requisicaoApi = RequisicaoApi

export default function ProvedorUsuario(props: any) {
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<string | null>(null)
    const { getCookies, setCookies, delCookies } = useCookies()
    const { jwt, setJwt } = useContext(ContextoToken)

    useEffect(() => {
        const processarLogin = async () => {
            const token = await cookiesObterToken()
            if (token) {
                const usuario = decodificarJwt(token)
                setUsuario(usuario)
                setJwt(token)
                requisicaoApi.adicionaToken(token)
            }
            setCarregando(false)
        }
        processarLogin()
    }, [])

    async function login(token: string) {
        const usuario = decodificarJwt(token)

        setUsuario(usuario)
        setJwt(token)
        requisicaoApi.adicionaToken(token)
        await cookiesInserirToken(token)
    }

    async function logout() {
        setUsuario(null)
        setJwt(null)
        requisicaoApi.apagaToken()
        await cookiesRemoverToken()
    }

    return (
        <ContextoUsuario.Provider
            value={{
                carregando,
                usuario,
                login,
                logout,
            }}>
            {props.children}
        </ContextoUsuario.Provider>
    )
}