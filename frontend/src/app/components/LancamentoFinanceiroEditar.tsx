"use client";
import { useEffect, useState } from "react";
import { LancamentoFinanceiro } from "../data/model/lancamentoFinanceiro";
import EntradaFormulario from "./LancamentoFinanceiroFormularioEntrada";
import useApi from "../(internas)/hooks/useApi";
import { formatDate } from "../Utils/utilsdata";
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
  const id = lancamento?.id?.split('-')[0]

  // const [descricaoLancamento, setDescricaoLancamento] = useState("");
  // const [valorLancamento, setValorLancamento] = useState<any>("");
  // const [tipoLancamento, setTipoLancamento] = useState("");
  // const [statusLancamento, setstatusLancamento] = useState("");
  // const [dataCriacaoLancamento, setDataCriacaoLancamento] = useState("");
  // const [formData, setFormData] = useState({ valor: '' })

  const [carregando, setCarregando] = useState<boolean>(true);
  const [mensagem, setMensagem] = useState<string>("");
  const [EhAlterado, atlernar] = useToggle()

  const { postApi, delApi, putApi } = useApi();

  useEffect(() => {
    if (lancamento) {
      // setDescricaoLancamento(lancamento.descricaoLancamento);
      // setValorLancamento(lancamento.valorLancamento);
      // setTipoLancamento(lancamento.tipoLancamento);
      // setstatusLancamento(lancamento.statusLancamento);
      // setDataCriacaoLancamento(formatDate(lancamento.dataCriacaoLancamento));
      setCarregando(false);
    }
  }, [lancamento]);

  if (carregando) return <div>...</div>
  

  const handleExcluir = async () => {
    try {
      const result = await delApi(`/lancamentofinanceiros/${idItem}`,);

      if (result.error) {
        setMensagem(result)
      } else {
        setMensagem("Exclusão realizada com sucesso!")
        router.push('/lancamentofinanceiros')
      }

    } catch (error) {
      setMensagem("Erro ao salvar o lançamento. Tente novamente.");
    }
  }

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
      const result = await putApi(`/lancamentofinanceiros/${idItem}`, dados);

      if (result.error) {
        setMensagem(result)
      } else {
        setMensagem("Alteração realizar com Sucesso!")
      }

    } catch (error) {
      setMensagem("Erro ao salvar o lançamento. Tente novamente.");
    }
  };

  const handleCancelar = async () => {
    router.push('/lancamentofinanceiros')
  }

  return (
    <div className="">
      <LancamentoFinanceiroCabecalho EhAlterado={EhAlterado} alternar={atlernar} />
      <form onSubmit={handleSalvar} className=" pt-5 pb-5">
        {mensagem && <div className="p-2 text-sm">{JSON.stringify(mensagem)}</div>}
        <LancamentoFinanceiroFormulario EhAlterado={EhAlterado} lancamento={lancamento} />
        <div className="mt-5">
          <LancamentoFinanceiroRodape EhAlterado={EhAlterado} handleCancelar={handleCancelar} handleExcluir={handleExcluir} />
        </div>
      </form>
    </div>
  )
}

/**
 *         <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <EntradaFormulario
              labelTexto="Id"
              tipo="text"
              nome="id"
              valor={id}
              somenteLeitura={true}
              className="flex flex-1"
            />
            <EntradaFormulario
              labelTexto="Descrição"
              tipo="text"
              nome="descricaolancamento"
              somenteLeitura={!EhAlterado}
              valor={lancamento?.descricaoLancamento}
              className="flex flex-1"
            />
            <EntradaFormulario
              labelTexto="Status"
              tipo="text"
              nome="statuslancamento"
              somenteLeitura={!EhAlterado}
              valor={statusLancamento}
              className="flex-1"
            />
          </div>
          <div className="flex flex-row gap-2 mt-2">
            <EntradaFormulario
              labelTexto="Data"
              tipo="date"
              nome="datalancamento"
              somenteLeitura={!EhAlterado}
              valor={dataCriacaoLancamento}
              className="flex-1"
            />
            <EntradaFormulario
              labelTexto="Valor"
              tipo="number"
              nome="valorlancamento"
              somenteLeitura={!EhAlterado}
              valor={valorLancamento}
              className="flex flex-1"
            />
            <EntradaFormulario
              labelTexto="Tipo"
              tipo="text"
              nome="tipolancamento"
              somenteLeitura={!EhAlterado}
              valor={tipoLancamento}
              className="flex-1"
            />
          </div>
        </div>
 */