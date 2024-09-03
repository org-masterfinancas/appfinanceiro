"use client";
import { useState } from "react";
import useApi from "@/app/(internas)/hooks/useApi";
import useToggle from "@/app/(internas)/hooks/useToogle";
import { useRouter } from 'next/navigation';
import { Box, Text } from "@mantine/core";
import dayjs from "dayjs";
import { hasLength, isInRange, isNotEmpty, useForm } from "@mantine/form";
import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro";
import FormCabecalho from "./FormCabecalho";
import FormRodape from "./FormRodape";
import FormConteudo from "./FormConteudo";

export default function Adicionar() {

  const router = useRouter();

  const form = useForm<LancamentoFinanceiro>({
    mode: 'uncontrolled',
    initialValues: {
      tipoLancamento: 'Despesa',
    } as LancamentoFinanceiro,
    validate: {
      dataCriacaoLancamento: isNotEmpty('Data vazia'),
      descricaoLancamento: hasLength({min:3, max:50}, 'A descrição deve ter de 2 a 10 caracteres'),
      statusLancamento: isNotEmpty('Status vazio'),
      tipoLancamento: isNotEmpty('Tipo lançamento vazio'),
      valorLancamento: isInRange({min:0.1},'Valor inválido'),
  },
  })

  const [mensagem, setMensagem] = useState<string>("");
  const [EhAlterado, atlernar] = useToggle()
  const { postApi } = useApi();

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

    const result = await postApi(`/lancamentofinanceiros/`, dados);
    if (result === null) {
      setMensagem("Não foi possível atualizar!")
    } else if (result.error) {
      setMensagem(result.error)
    } else {
      router.push('/lancamento-financeiro')
    }
  }

  const handleCancelar = async () => {
    router.push('/lancamento-financeiro')
  }

  return (
    <Box>
       <FormCabecalho novoLancamento EhAlterado={EhAlterado} alternar={atlernar} />
      <form onSubmit={form.onSubmit(handleSalvar)}>
        {mensagem && <Text c={"red"}>{JSON.stringify(mensagem)}</Text>}
          <FormConteudo 
          form={form}
          EhAlterado
          novoLancamento/>
        <div>
          <FormRodape novoLancamento EhAlterado={EhAlterado} handleCancelar={handleCancelar}/>
        </div>
      </form>
    </Box>
  )
}