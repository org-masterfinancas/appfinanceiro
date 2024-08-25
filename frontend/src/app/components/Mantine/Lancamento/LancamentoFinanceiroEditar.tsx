"use client";
import { useEffect, useState } from "react";
import { LancamentoFinanceiro } from "../../../data/model/lancamentoFinanceiro";
import useApi from "../../../(internas)/hooks/useApi";
import useToggle from "../../../(internas)/hooks/useToogle";
import { useRouter } from 'next/navigation';
import LancamentoFinanceiroCabecalho from "./LancamentoFinanceiroFormCabecalho";
import LancamentoFinanceiroRodape from "./LancamentoFinanceiroFormRodape";
import LancamentoFinanceiroFormulario from "./LancamentoFinanceiroFormConteudo";

import { hasLength, isInRange, isNotEmpty, useForm } from "@mantine/form";
import { DateInput, DateInputProps } from "@mantine/dates";
import dayjs from "dayjs";
import { Text } from "@mantine/core";

interface LancamentoFinanceiroEditarProps {
  lancamento: LancamentoFinanceiro
}

const dateParser: DateInputProps['dateParser'] = (input) => {
  return dayjs(input, 'YYYY-MM-DD').toDate();
}

export default function LancamentoFinanceiroEditar({ lancamento }: LancamentoFinanceiroEditarProps) {

  const router = useRouter();
  const idItem = lancamento?.id ?? "";
  const novoLancamento = false


  const form = useForm<LancamentoFinanceiro>({
    mode: 'uncontrolled',
    initialValues:
      lancamento,
    validate: {
      dataCriacaoLancamento: isNotEmpty('Data vazia'),
      descricaoLancamento: hasLength({ min: 3, max: 50 }, 'A descrição deve ter de 2 a 10 caracteres'),
      statusLancamento: isNotEmpty('Status vazio'),
      tipoLancamento: isNotEmpty('Tipo lançamento vazio'),
      valorLancamento: isInRange({ min: 0.1 }, 'Valor inválido'),
    },
  });

  const [carregando, setCarregando] = useState<boolean>(true);
  const [mensagem, setMensagem] = useState<string>("");
  const [EhAlterado, atlernar] = useToggle()
  const { delApi, putApi } = useApi();

  useEffect(() => {
    if (lancamento) {
      setCarregando(false);

      const lancamentoFormatado = {
        ...lancamento,
        dataCriacaoLancamento: dayjs(lancamento.dataCriacaoLancamento).toDate(),
        valorLancamento: +lancamento.valorLancamento
      }
      form.setValues(lancamentoFormatado);
      form.resetDirty(lancamentoFormatado);
    }
  }, [lancamento]);

  if (carregando) return <div>...</div>




  const handleExcluir = async () => {
    const result = await delApi(`/lancamentofinanceiros/${idItem}`,);

    if (result === null) {
      setMensagem("Não foi possível excluir!")
    } else if (result.error) {
      setMensagem(result.errror)
    } else {
      router.push('/lancamentofinanceiros')
    }
  }

  const handleSalvar = async (lancamento: LancamentoFinanceiro) => {


    const dadosFormulario = {
      ...lancamento,
      dataCriacaoLancamento: dayjs(lancamento.dataCriacaoLancamento).format('YYYY-MM-DD')
    }

    const dados = {
      lancamentofinanceiro: {
        descricaoLancamento: dadosFormulario.descricaoLancamento,
        valorLancamento: +dadosFormulario.valorLancamento,
        tipoLancamento: dadosFormulario.tipoLancamento,
        statusLancamento: dadosFormulario.statusLancamento,
        dataCriacaoLancamento: dadosFormulario.dataCriacaoLancamento

      }
    }

    const result = await putApi(`/lancamentofinanceiros/${idItem}`, dados);
    console.log(result)

    if (result === null) {
      setMensagem("Não foi possível atualizar!")
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
    <div>

      <LancamentoFinanceiroCabecalho EhAlterado={EhAlterado} alternar={atlernar} />
      <form onSubmit={form.onSubmit(handleSalvar)}>
        {mensagem && <Text c={"red"}>{JSON.stringify(mensagem)}</Text>}
        {/* Início Conteúdo Formulário */}
        <LancamentoFinanceiroFormulario
          form={form}
          EhAlterado={EhAlterado}
          novoLancamento={novoLancamento} />
        {/* Fim Conteúdo Formulário */}
        <div>
          <LancamentoFinanceiroRodape EhAlterado={EhAlterado} handleCancelar={handleCancelar} handleExcluir={handleExcluir} />
        </div>
      </form>

    </div>
  )
}