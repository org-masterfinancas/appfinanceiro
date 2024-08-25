'use client'
import UsuarioFormulario from '@/app/components/Mantine/Usuario/UsuarioFormulario'
import { ContextoUsuario } from '@/app/data/contexts/ContextoUsuario'
import { useContext } from 'react'

export default function Usuario() {
  const { usuario } = useContext(ContextoUsuario)

  return (
   <UsuarioFormulario/>
  )
}