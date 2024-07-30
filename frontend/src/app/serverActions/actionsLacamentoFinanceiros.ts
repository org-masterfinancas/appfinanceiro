"use server";
import { httpPost, httpPut, httpGet, httpDelete } from './requisicaoApiServerAction'

export async function novoLancamento(prevState: { message: string; }, formData: FormData,) {
  const dados = {
    lancamentofinanceiro: {
      descricaoLancamento: formData.get('descricao-lancamento'),
      tipoLancamento: formData.get('tipo-lancamento'),
      valorLancamento: formData.get('valor-lancamento'),
      statusLancamento: formData.get('status-lancamento'),
      dataCriacaoLancamento: formData.get('data-criacao-lancamento')
    }
  }

  const resultado = await httpPost('/lancamentofinanceiros/', dados)
  if (resultado.error) return { message: resultado.error }
  return { message: 'ok' };

}

export async function atualizarLancamento(prevState: { message: string; }, formData: FormData,) {
  const dados = {
    lancamentofinanceiro: {
      id: formData.get('id'),
      descricaoLancamento: formData.get('descricao-lancamento'),
      tipoLancamento: formData.get('tipo-lancamento'),
      valorLancamento: formData.get('valor-lancamento'),
      statusLancamento: formData.get('status-lancamento'),
      dataCriacaoLancamento: formData.get('data-criacao-lancamento')
    }
  }
  const id = dados.lancamentofinanceiro.id?.toString()

  const resultado = await httpPut(`/lancamentofinanceiros/${id}`, dados)
  if (resultado.error) return { message: resultado.error }
  return { message: 'ok' };
}

export async function excluirLancamento(prevState: { message: string; }, formData: FormData) {

  const data = {
    id: formData.get("id"),
  }

  const resultado = await httpDelete(`/lancamentofinanceiros/${data.id}`)
  if (resultado.error) return { message: resultado.error }
  return { message: 'ok' };
}