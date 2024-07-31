'use client'
import { useContext } from "react"
import { ContextoUsuario } from "../data/contexts/ContextoUsuario"

export default function MenuUsuario(props: any){
    const { logout, usuario } = useContext(ContextoUsuario)
    const inicial = usuario ? usuario.charAt(0).toUpperCase() : '';
    return(
        <div className="text-white flex flex-col">
            <span className="m-2 rounded-full border border-white text-center font-bold">{inicial}</span>
            <button onClick={logout} className="m-2 rounded-full border border-white">Sair</button>
        </div>
    )
}