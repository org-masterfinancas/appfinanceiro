"use client";
import { useState } from "react";
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
  const { postApi } = useApi();

  const handleSalvar = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const dadosFormulario = Object.fromEntries(formData.entries())

    const dados = {
      lancamentofinanceiro: {
        descricaoLancamento: dadosFormulario.descricaolancamento,
        valorLancamento: +dadosFormulario.valorlancamento,
        tipoLancamento: dadosFormulario.tipolancamento,
        statusLancamento: dadosFormulario.statuslancamento,
        dataCriacaoLancamento: dadosFormulario.datalancamento

      }
    }

    const result = await postApi('/lancamentofinanceiros/', dados);
    if (result === null) {
      setMensagem("Não Foi possível salvar!")
    } else if (result.error) {
      setMensagem(result.error)
    } else {
      router.push('/lancamentofinanceiros')
    }
  }

  const handleCancelar = async () => {
    router.push('/lancamentofinanceiros')
  }
  return (
    <div className="">
      <LancamentoFinanceiroCabecalho EhAlterado={EhAlterado} alternar={atlernar} novoLancamento />
      <form onSubmit={handleSalvar} className="pt-5 pb-5">
        {mensagem && <span className="text-red-500 text-sm bg-red-200">{JSON.stringify(mensagem)}</span>}
        <LancamentoFinanceiroFormulario EhAlterado={EhAlterado} novoLancamento />
        <div className="mt-5">
          <LancamentoFinanceiroRodape EhAlterado={EhAlterado} handleCancelar={handleCancelar} novoLancamento />
        </div>
      </form>
    </div>
  )
}