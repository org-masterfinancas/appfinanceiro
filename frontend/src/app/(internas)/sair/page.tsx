'use client'
import { useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ContextoUsuario } from "@/app/data/contexts/ContextoUsuario"

export default function Sair() {
    const { logout } = useContext(ContextoUsuario)
    const routerNavigation = useRouter()

    useEffect(() => {
       const sairApp = async ()=>{
           logout()
       }
       sairApp()
    }, [])

    return null
}