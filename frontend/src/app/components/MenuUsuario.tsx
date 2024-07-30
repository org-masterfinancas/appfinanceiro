'use client'
import { useContext } from "react"
import { ContextoUsuario } from "../data/contexts/ContextoUsuario"

export default function MenuUsuario(props: any){
    const { logout, usuario } = useContext(ContextoUsuario)
    return(
        <div className="text-white">
            <span>{usuario}</span>
            <button onClick={logout} className="px-4 py-2 rounded-md">Sair</button>
        </div>
    )
}