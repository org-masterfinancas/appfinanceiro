"use client";
import { useEffect, useState } from "react";
import { LancamentoFinanceiro } from "../data/model/lancamentoFinanceiro";
import useApi from "../(internas)/hooks/useApi";
import useToggle from "../(internas)/hooks/useToogle";
import { useRouter } from 'next/navigation';
import LancamentoFinanceiroCabecalho from "./LancamentoFinanceiroCabecalho";
import LancamentoFinanceiroRodape from "./LancamentoFinanceiroRodape";
import LancamentoFinanceiroFormulario from "./LancamentoFinanceiroFormulario";

interface LancamentoFinanceiroEditarProps {
  lancamento?: LancamentoFinanceiro;
}

export default function LancamentoFinanceiroEditar({ lancamento }: LancamentoFinanceiroEditarProps) {

  const router = useRouter();
  const idItem = lancamento?.id ?? "";

  const [carregando, setCarregando] = useState<boolean>(true);
  const [mensagem, setMensagem] = useState<string>("");
  const [EhAlterado, atlernar] = useToggle()
  const { delApi, putApi } = useApi();

  useEffect(() => {
    if (lancamento) {
      setCarregando(false);
    }
  }, [lancamento]);

  if (carregando) return <div>...</div>
  

  const handleExcluir = async () => {
      const result = await delApi(`/lancamentofinanceiros/${idItem}`,);

      if (result === null) {
        setMensagem("Não foi possível excluir!")
      } else if(result.error)  {
        setMensagem(result.errror)
      }else{
        router.push('/lancamentofinanceiros')
      }
  }

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

      const result = await putApi(`/lancamentofinanceiros/${idItem}`, dados);
      
      if (result === null) {
        setMensagem("Não foi possível atualizar!")
      } else if(result.error) {
        setMensagem(result.error)
      }else{
        router.push('/lancamentofinanceiros')
      }
  }

  const handleCancelar = async () => {
    router.push('/lancamentofinanceiros')
  }

  return (
    <div className="">
      <LancamentoFinanceiroCabecalho EhAlterado={EhAlterado} alternar={atlernar} />
      <form onSubmit={handleSalvar} className=" pt-5 pb-5">
        {mensagem && <span className="text-red-500 text-sm bg-red-200">{JSON.stringify(mensagem)}</span>}
        <LancamentoFinanceiroFormulario EhAlterado={EhAlterado} lancamento={lancamento} />
        <div className="mt-5">
          <LancamentoFinanceiroRodape EhAlterado={EhAlterado} handleCancelar={handleCancelar} handleExcluir={handleExcluir} />
        </div>
      </form>
    </div>
  )
}