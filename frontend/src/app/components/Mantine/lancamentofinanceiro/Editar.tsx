"use client";
import { useEffect, useState } from "react";
import useApi from "@/app/(internas)/hooks/useApi";
import useToggle from "@/app/(internas)/hooks/useToogle";
import { useRouter } from 'next/navigation';
import { hasLength, isInRange, isNotEmpty, useForm } from "@mantine/form";
import dayjs from "dayjs";
import { Loader, Text } from "@mantine/core";
import { LancamentoFinanceiro } from "../../../data/model/lancamentoFinanceiro";
import LancamentoFinanceiroCabecalho from "./FormCabecalho";
import LancamentoFinanceiroFormulario from "./FormConteudo";
import LancamentoFinanceiroRodape from "./FormRodape";

interface EditarProps {
  lancamento: LancamentoFinanceiro
}

export default function Editar({ lancamento }: EditarProps) {

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
  })
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
        id: "#"+lancamento.id.split('-')[0],
        valorLancamento: +lancamento.valorLancamento
      }
      form.setValues(lancamentoFormatado);
      form.resetDirty(lancamentoFormatado);
    }
  }, [lancamento]);

  if (carregando) return  <Loader color="yellow" type="bars" />

  const handleExcluir = async () => {
    const result = await delApi(`/lancamentofinanceiros/${idItem}`,);

    if (result === null) {
      setMensagem("Não foi possível excluir!")
    } else if (result.error) {
      setMensagem(result.errror)
    } else {
      router.push('/lancamento-financeiro')
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
      router.push('/lancamento-financeiro')
    }
  }

  const handleCancelar = async () => {
    router.push('/lancamento-financeiro')
  }

  return (
    <div>
      <LancamentoFinanceiroCabecalho EhAlterado={EhAlterado} alternar={atlernar} />
      <form onSubmit={form.onSubmit(handleSalvar)}>
        {mensagem && <Text c={"red"}>{JSON.stringify(mensagem)}</Text>}
        <LancamentoFinanceiroFormulario
          form={form}
          EhAlterado={EhAlterado}
          novoLancamento={novoLancamento} />
        <div>
          <LancamentoFinanceiroRodape EhAlterado={EhAlterado} handleCancelar={handleCancelar} handleExcluir={handleExcluir} />
        </div>
      </form>
    </div>
  )
}