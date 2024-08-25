'use client'
import { useContext, useEffect } from "react"
import { ContextoUsuario } from "../../data/contexts/ContextoUsuario"
import { useRouter } from "next/navigation"

export default function ForcarUsuarioLogado(props: any){
    const {usuario, carregando} = useContext(ContextoUsuario)
    const router = useRouter()
    
    useEffect(() => {
        if (!carregando && usuario === null) {
            router.push('/')
        }
    }, [carregando, usuario, router])
    
    if (carregando) {
        return <div className="h-screen">...</div>
    }
    
    if (usuario === null) {
        return null
    }
    
    return props.children
      
}


//Abordagem Inicial, gera aviso no console sobre hooks no corpo do componente
/**
 *     if (carregando){
        return <div>Carregando...</div>
    }

    if(usuario === null) {
        router.push('/')
        return null
    }

 */

//Abordagem  com useEffect
/**
 * 'use client'
import { useContext, useEffect } from "react"
import { ContextoUsuario } from "../data/contexts/ContextoUsuario"
import { useRouter } from "next/navigation"

export default function ForcarUsuarioLogado(props: any){
    const {usuario, carregando} = useContext(ContextoUsuario)
    const router = useRouter()
    
    useEffect(() => {
        if (!carregando && usuario === null) {
            router.push('/')
        }
    }, [carregando, usuario, router])
    
    if (carregando) {
        return <div className="h-screen">...</div>
    }
    
    if (usuario === null) {
        return null
    }
    
    return props.children
      
}
 * 
 */