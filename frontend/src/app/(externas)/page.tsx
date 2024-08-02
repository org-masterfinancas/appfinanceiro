'use client'
import { use, useContext, useEffect, useState } from "react";
import { ContextoUsuario } from "../data/contexts/ContextoUsuario";
import Link from "next/link";
import BotaoSubmeter from "@/app/components/BotaoSubmeter";
import { useFormState, useFormStatus } from "react-dom";
import { loginBackend } from "@/app/serverActions/actionAutenticacao";
import { ContextoToken } from "@/app/data/contexts/ContextoToken";
import { redirect } from "next/navigation";

const estadoInicial = {
  message: ""
}

export default function Home() {
  const { login, usuario } = useContext(ContextoUsuario)
  const [state, formAction] = useFormState(loginBackend, estadoInicial)

  useEffect(() => {
    if (state?.message === 'ok') {
      login(state.token)
      redirect('/lancamentofinanceiros')
    }
  }, [state?.message, login]);

  return (
    <div className="
     min-h-screen 
     flex flex-col 
     items-center content-center gap-10
     p-24"> {/* flex flex-col justify-center items-center border border-red-500 m-10 p-5 h-screen gap-10 */}
      <h1 className="text-xl font-black" >Minhas Finanças</h1>
      <span className="text-red-500" >{state?.message}</span>
      <span>{usuario}</span>
      <div >
        <form action={formAction} className="flex flex-col gap-5">
          <input
            id="email"
            name="email"
            type="text"
            placeholder="E-mail"
            className="border p-2 rounded-md text-black font-black"
          />
          <input
            id="senha"
            name="senha"
            type="password"
            placeholder="Senha"
            className="border p-2 rounded-md text-black font-black"
          />
          <BotaoSubmeter titulo="Entrar" />
        </form>
      </div>
    </div>
  )
}