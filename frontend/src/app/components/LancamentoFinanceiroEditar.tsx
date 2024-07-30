"use client";
import { useEffect, useState } from "react";
import { LancamentoFinanceiro } from "../data/model/lancamentoFinanceiro";
import EntradaFormulario from "./EntradaFormulario";
import useApi from "../(internas)/hooks/useApi";
import { formatDate } from "../Utils/utilsdata";
import useToggle from "../(internas)/hooks/useToogle";
import { useRouter } from 'next/navigation';

interface LancamentoFinanceiroEditarProps {
  lancamento?: LancamentoFinanceiro;
}

export default function LancamentoFinanceiroEditar({ lancamento }: LancamentoFinanceiroEditarProps) {
  
  const router = useRouter();

  const idItem = lancamento?.id ?? "";
  const id = lancamento?.id?.split('-')[0]

  const [descricaoLancamento, setDescricaoLancamento] = useState("");
  const [valorLancamento, setValorLancamento] = useState<any>("");
  const [tipoLancamento, setTipoLancamento] = useState("");
  const [statusLancamento, setstatusLancamento] = useState("");
  const [dataCriacaoLancamento, setDataCriacaoLancamento] = useState("");
  const [carregando, setCarregando] = useState<boolean>(true);
  const [mensagem, setMensagem] = useState<string>("");
  const [EhAlterado, atlernar] = useToggle()
  const [formData, setFormData] = useState({valor: ''})

  const { postApi, delApi, putApi } = useApi();

  useEffect(() => {
    if (lancamento) {
      setDescricaoLancamento(lancamento.descricaoLancamento);
      setValorLancamento(lancamento.valorLancamento);
      setTipoLancamento(lancamento.tipoLancamento);
      setstatusLancamento(lancamento.statusLancamento);
      setDataCriacaoLancamento(formatDate(lancamento.dataCriacaoLancamento));
      setCarregando(false);
    }
  }, [lancamento]);

  if (carregando) return <div>...</div>;

  const handleExcluir = async (id: string) => {
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
      lancamentofinanceiro:{
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

  const handleCancelar = async ()=>{
    router.push('/lancamentofinanceiros')
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      { mensagem && <div>{JSON.stringify(mensagem)}</div> }
      <div className="flex justify-between border border-green-500 p-5"> {/*Cabeçalho Formulário */}
        <div>
          Modo: {EhAlterado ? <span>Edição</span> : <span>Vizualização</span>}
        </div>
        {!EhAlterado ?
          <button className=" bg-zinc-500 rounded-lg p-2" onClick={atlernar}>Editar</button> : ""}
      </div>
      <form onSubmit={handleSalvar} className=" p-5">
        <h1>Formulário</h1>
        <EntradaFormulario
          labelTexto="Id"
          tipo="text"
          nome="id"
          valor={id}
          somenteLeitura={true}
          className=""
        />
        <EntradaFormulario
          labelTexto="Descrição"
          tipo="text"
          nome="descricaolancamento"
          somenteLeitura={!EhAlterado}
          valor={descricaoLancamento}
          className=""
        />
        <EntradaFormulario
          labelTexto="Valor"
          tipo="number"
          nome="valorlancamento"
          somenteLeitura={!EhAlterado}
          valor={valorLancamento}
          className=""
        />
        <EntradaFormulario
          labelTexto="Tipo"
          tipo="text"
          nome="tipolancamento"
          somenteLeitura={!EhAlterado}
          valor={tipoLancamento}
          className=""
        />
        <EntradaFormulario
          labelTexto="Status"
          tipo="text"
          nome="statuslancamento"
          somenteLeitura={!EhAlterado}
          valor={statusLancamento}
          className=""
        />
        <EntradaFormulario
          labelTexto="Data"
          tipo="text"
          nome="datalancamento"
          somenteLeitura={!EhAlterado}
          valor={dataCriacaoLancamento}
          className="pb-5"
        />
        <div className="flex gap-2  p-5">
        {EhAlterado && (
          <>
          <button type="submit" className="bg-green-500 rounded-lg p-2" >Salvar</button>
          <button type="button" className="bg-zinc-500 rounded-lg p-2" onClick={handleCancelar}>Cancelar</button>
          <button type="button" className="ml-auto bg-red-500 rounded-lg p-2" onClick={() => handleExcluir(idItem)}>Excluir</button>
          </>
        )} 
        </div> 
      </form>
    </div>
  )
}
