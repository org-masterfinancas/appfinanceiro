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
    <div className="flex flex-col justify-center items-center h-screen gap-10">
      <h1 className="text-xl font-black" >Minhas Finanças</h1>
      <h2 >{state?.message}</h2>
      <span>{usuario}</span>
      <div >
        <form action={formAction} className="flex flex-col gap-5">
          <input
            id="email"
            name="email"
            type="text"
            placeholder="E-mail"
            className="border p-2 rounded-md font-black"
          />
          <input
            id="senha"
            name="senha"
            type="password"
            placeholder="Senha"
            className="border p-2 rounded-md font-black"
          />
          <BotaoSubmeter titulo="Entrar" />
        </form>
      </div>
    </div>
  )
}