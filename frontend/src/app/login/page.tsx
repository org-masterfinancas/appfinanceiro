import { getSession, login, logout } from "@/lib/libauth";
import { redirect } from "next/navigation";

export default async function Page() {

   return (
    <section className="flex min-h-screen flex-col items-center p-24">
      <form
        className="flex flex-col"
        action={async (formData) => {
          'use server'
          await login(formData);
          redirect("/");
        }}
      >
        <input className="m-2" type="email" placeholder="Email" name="email" />
        <input className="m-2" type="password" placeholder="Senha" name="senha" />
        <button type="submit">Login</button>
      </form>
      <div>
        {'Resultado: '}
      </div>
    </section>
  );
}





/**
 * 'use client'
import { redirect } from "next/navigation";
import { getSession, login, logout } from "@/lib/libauth";
import { useState } from "react";

export default async function Page() {
  const [resultado, setResultado] = useState('')

  const handleSubmit = async (formData: FormData) =>{
    'use server'
    const resultado = await login(formData)
    setResultado
  }
  
  return (
    <section className="flex min-h-screen flex-col items-center p-24">
      <form 
      className="flex flex-col"
      onSubmit={async(e:any) =>{
        e.preventDefault()
        const formData = new FormData(e.target)
        await handleSubmit(formData)
      }}
      >
        <input className="m-2" type="email" placeholder="Email" name="email" />
        <input className="m-2" type="password" placeholder="Senha" name="senha" />
        <button type="submit">Login</button>
      </form>
      <div>
        {resultado ? `${resultado}` : 'Login Incorreto'}
      </div>
    </section>
  );
}

 */