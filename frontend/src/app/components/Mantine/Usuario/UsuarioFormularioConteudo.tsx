"use client";
import { formatDate } from "../../../Utils/utilsdata";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useContext } from "react";
import { ContextoUsuario } from "@/app/data/contexts/ContextoUsuario";

interface UsuarioFormularioConteudoProps {
  EhAlterado: boolean
  alternar?: () => void
  handleSalvar?: () => void
  handleCancelar?: () => void
  mensagem?: any
  novoUsuario?: boolean

}

export default function UsuarioFormularioConteudo({ EhAlterado, novoUsuario, handleCancelar, handleSalvar }: UsuarioFormularioConteudoProps) {
  EhAlterado = novoUsuario ? true : false
  
  const { usuario } = useContext(ContextoUsuario)
  


  return (
    <>
      {usuario ? (
        <>
          <input
            type="hidden"
            name="id"
            value={usuario.id}
            readOnly
          />
        </>
      )
        : (
          false
        )
      }
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Perfil</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Informações do seu perfil.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Usuário:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-100 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">financeiro/</span>
                  <input
                    id="nomeusuario"
                    name="nomeusuario"
                    type="text"
                    readOnly
                    value={usuario.email}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

            </div>
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Permissões:
              </label>
              <div className="mt-2">
                <select
                  id="perfil"
                  name="perfil"
                  defaultValue={usuario.perfil}
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                > 
                  <option>Admin</option>
                  <option>Usuario</option>
                  <option>Sem Perfil</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Foto:
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <img src={usuario.avatar} width={50}  className="h-10 w-10 rounded-full" />
              </div>

          
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-100 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm pr-2">Url:</span>
                  <input
                    id="avatar"
                    name="avatar"
                    type="text"
                    defaultValue={usuario.avatar}
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

            </div>

            

            
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">

          <h2 className="text-base font-semibold leading-7 text-gray-900">Informações Pessoais</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Mantenha seus dados Atualizados.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">
                Nome:
              </label>
              <div className="mt-2">
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  defaultValue={usuario.nome}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="sobrenome" className="block text-sm font-medium leading-6 text-gray-900">
                Sobrenome:
              </label>
              <div className="mt-2">
                <input
                  id="sobrenome"
                  name="sobrenome"
                  type="text"
                  defaultValue={usuario.sobrenome}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

 
          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={handleCancelar}
          className="text-sm font-semibold leading-6 text-gray-900">
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Salvar
        </button>
      </div>

    </>
  )
}