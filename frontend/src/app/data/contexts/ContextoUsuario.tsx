'use client'
import { createContext, useContext, useEffect, useState } from "react"
import { ContextoToken } from "./ContextoToken"
import decodificarJwt from '../../Utils/utilsJwt'
import useCookies from "@/app/(internas)/hooks/useCookies"
import { cookiesInserirToken, cookiesObterToken, cookiesRemoverToken } from "@/app/serverActions/actionsCookies"
import RequisicaoApi from "@/app/requisicao/requisicaoApi"
import { adicionaToken, apagaToken }  from "../../serverActions/requisicaoApiServerAction"


const ContextoUsuario = createContext<any>({})
export { ContextoUsuario }

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
                await adicionaToken(token)
                RequisicaoApi.adicionaToken(token)
            }
            setCarregando(false)
        }
        processarLogin()
    }, [])

    async function login(token: string) {
        const usuario = decodificarJwt(token)

        setUsuario(usuario)
        setJwt(token)
        RequisicaoApi.adicionaToken(token)
        await cookiesInserirToken(token)
        await adicionaToken(token)
    }

    async function logout() {
        setUsuario(null)
        setJwt(null)
        RequisicaoApi.apagaToken()
        await cookiesRemoverToken()
        await apagaToken()
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