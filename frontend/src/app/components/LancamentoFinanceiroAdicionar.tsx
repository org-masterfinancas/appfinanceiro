"use client";
import { useEffect, useState } from "react";
import EntradaFormulario from "./LancamentoFinanceiroFormularioEntrada";
import useApi from "../(internas)/hooks/useApi";
import useToggle from "../(internas)/hooks/useToogle";
import { useRouter } from 'next/navigation';
import LancamentoFinanceiroCabecalho from "./LancamentoFinanceiroCabecalho";
import LancamentoFinanceiroRodape from "./LancamentoFinanceiroRodape";
import LancamentoFinanceiroFormulario from "./LancamentoFinanceiroFormulario";

export default function LancamentoFinanceiroAdicionar() {

  const router = useRouter();

  const [mensagem, setMensagem] = useState<string>("");
  const [EhAlterado, atlernar] = useToggle()
  const [formData, setFormData] = useState({ valor: '' })

  const { postApi } = useApi();

  const handleSalvar = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const dadosFormulario = Object.fromEntries(formData.entries())

    const dados = {
      lancamentofinanceiro: {
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

  const handleCancelar = async () => {
    router.push('/lancamentofinanceiros')
  }


  return (
    <div className="">
      <LancamentoFinanceiroCabecalho EhAlterado={EhAlterado} alternar={atlernar} novoLancamento />
      <form onSubmit={handleSalvar} className="pt-5 pb-5 "> 
        {mensagem && <div>{JSON.stringify(mensagem)}</div>}
        <LancamentoFinanceiroFormulario EhAlterado={EhAlterado} novoLancamento/>
        <div className="mt-5">
          <LancamentoFinanceiroRodape EhAlterado={EhAlterado} handleCancelar={handleCancelar} novoLancamento />
        </div>
      </form>
    </div>
  )
}

/*
        
<div className="flex flex-col">
<div className="flex flex-row gap-2"> 
  <EntradaFormulario
    labelTexto="Descrição"
    tipo="text"
    nome="descricaolancamento"
    className="flex-1"
  />
  <EntradaFormulario
    labelTexto="Status"
    tipo="text"
    nome="statuslancamento"
    className="flex-1"
  />
</div>
<div className="flex flex-row gap-2 mt-4"> 
    labelTexto="Data"
    tipo="date"
    nome="datalancamento"
    className="flex-1"
  />
  <EntradaFormulario
    labelTexto="Tipo"
    tipo="text"
    nome="tipolancamento"
    className="flex-1"
  />
  <EntradaFormulario
    labelTexto="Valor"
    tipo="number"
    nome="valorlancamento"
    className="flex-1"
  />
</div>
</div>
*/