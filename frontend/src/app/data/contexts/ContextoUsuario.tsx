'use client'
import { createContext, useContext, useEffect, useState } from "react"
import { ContextoToken } from "./ContextoToken"
import decodificarJwt from '@/app/util/jwt'
import { cookiesInserirToken, cookiesObterToken, cookiesRemoverToken } from "@/app/server-actions/actions-cookies"
import RequisicaoApi from "@/app/requisicao/requisicao-api"

const ContextoUsuario = createContext<any>({})
export { ContextoUsuario }

export default function ProvedorUsuario(props: any) {
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<{} | null>(null)
    const { jwt, setJwt } = useContext(ContextoToken)

    useEffect(() => {
        const processarLogin = async () => {
            const token = await cookiesObterToken()
            if (token) {
                const usuario = decodificarJwt(token)
                setUsuario(usuario)
                setJwt(token)
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
    }

    async function logout() {
        await cookiesRemoverToken()
        RequisicaoApi.apagaToken()
        setJwt(null)
        setUsuario(null)
    }

    async function atualizarUsuario(nome: string, sobrenome: string, avatar: string) {
        const usuarioAtualizado = {
            ...usuario,
            nome: nome,
            sobrenome: sobrenome,
            avatar: avatar
        }
        setUsuario(usuarioAtualizado)
    }


    return (
        <ContextoUsuario.Provider
            value={{
                carregando,
                usuario,
                login,
                logout,
                atualizarUsuario,
            }}>
            {props.children}
        </ContextoUsuario.Provider>
    )
}
