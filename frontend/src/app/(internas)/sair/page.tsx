'use client'
import { useContext, useEffect } from "react"
import { ContextoUsuario } from "@/app/data/contexts/ContextoUsuario"

export default function Sair() {
    const { logout } = useContext(ContextoUsuario)

    useEffect(() => {
       const sairApp = async ()=>{
           logout()
       }
       sairApp()
    }, [])

    return null
}