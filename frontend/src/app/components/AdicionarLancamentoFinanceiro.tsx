"use client";
import { useEffect, useState } from "react";
import EntradaFormulario from "./EntradaFormulario";
import useApi from "../(internas)/hooks/useApi";
import useToggle from "../(internas)/hooks/useToogle";
import { useRouter } from 'next/navigation';

export default function AdicionarLancamentoFinanceiro() {
  
  const router = useRouter();

  const [mensagem, setMensagem] = useState<string>("");
  const [EhAlterado, atlernar] = useToggle()
  const [formData, setFormData] = useState({valor: ''})

  const { postApi } = useApi();

  const handleSalvar = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const dadosFormulario = Object.fromEntries(formData.entries())
    
    const dados = {
      lancamentofinanceiro:{
        descricaoLancamento: dadosFormulario.descricaolancamento,
        valorLancamento: dadosFormulario.valorlancamento,
        tipoLancamento: dadosFormulario.tipolancamento,
        statusLancamento: dadosFormulario.statuslancamento,
        dataCriacaoLancamento: dadosFormulario.datalancamento

      }
    }

    try {
      const result = await postApi('/lancamentofinanceiros/', dados);

      if (result.error) {
        setMensagem(result)
      } else {
        setMensagem("Alteração realizar com Sucesso!")
      }

    } catch (error) {
      setMensagem("Erro ao salvar o lançamento. Tente novamente.");
    }
  }

  const handleCancelar = async ()=>{
    router.push('/lancamentofinanceiros')
  }

 
  return (
    <div className="flex flex-col gap-5 border border-zinc-500 p-5">
    { mensagem && <div>{JSON.stringify(mensagem)}</div> }
      <form onSubmit={handleSalvar} className="flex flex-col border border-green-500 p-5"> {/*Formulário */}
        <EntradaFormulario
          labelTexto="Descrição"
          tipo="text"
          nome="descricaolancamento"
          className=""
        />
        <EntradaFormulario
          labelTexto="Valor"
          tipo="number"
          nome="valorlancamento"
          className=""
        />
        <EntradaFormulario
          labelTexto="Tipo"
          tipo="text"
          nome="tipolancamento"
          className=""
        />
        <EntradaFormulario
          labelTexto="Status"
          tipo="text"
          nome="statuslancamento"
          className=""
        />
        <EntradaFormulario
          labelTexto="Data"
          tipo="text"
          nome="datalancamento"
          className="pb-5"
        />
        <div className="flex gap-2 border border-green-500 p-5">
          <button type="submit" className="bg-green-500 rounded-lg p-2" >Salvar</button>
          <button type="button" className="bg-zinc-500 rounded-lg p-2" onClick={handleCancelar}>Cancelar</button>
        </div> 
      </form>
    </div>
  )
}
