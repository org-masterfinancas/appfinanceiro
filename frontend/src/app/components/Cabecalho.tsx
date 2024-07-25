'use client'
import { useContext } from "react"
import { ContextoUsuario } from "../data/contexts/ContextoUsuario"

export default function Cabecalho(props: any){
    const { logout, usuario } = useContext(ContextoUsuario)
    return(
        <header className="flex justify-end px-10 items-center bg-zinc-400 h-24">
            <button onClick={logout} className="bg-red-600 px-4 py-2 rounded-md">Logout</button>
            <span>{usuario}</span>
        </header>
    )
}