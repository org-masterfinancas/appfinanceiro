"use server";
import RequisicaoApi from "../requisicao/requisicaoApi";
import { cookies } from 'next/headers'

const cookieStore = cookies();
const token = cookieStore.get('token')?.value

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
  const requisicaoApi = RequisicaoApi;
  if (token) {
    requisicaoApi.adicionaToken(token); 
  } 

  const resultado = await requisicaoApi.httpPost('/lancamentofinanceiros/', dados)
  requisicaoApi.apagaToken()
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
  
  const requisicaoApi = RequisicaoApi
  if (token) {
    requisicaoApi.adicionaToken(token); 
  } 

  const resultado = await requisicaoApi.httpPut(`/lancamentofinanceiros/${id}`, dados)
  requisicaoApi.apagaToken()
  if (resultado.error) return { message: resultado.error }
  return { message: 'ok' };
}

export async function excluirLancamento(
  prevState: {
    message: string;
  },
  formData: FormData,
) {

  const data = {
    id: formData.get("id"),
  }
  
  const requisicaoApi = RequisicaoApi;
  if (token) {
    requisicaoApi.adicionaToken(token); 
  } 
  const resultado = await requisicaoApi.httpDelete(`/lancamentofinanceiros/${data.id}`)
  requisicaoApi.apagaToken()
  if (resultado.error) return { message: resultado.error }
  return { message: 'ok' };
}
