"use server";
import RequisicaoApi from '../requisicao/requisicaoApi';


export async function loginBackend(prevState: { message: string; }, formData: FormData,) {
  const dados = {
      email: formData.get('email'),
      senha: formData.get('senha'),
  }
  const resultado = await RequisicaoApi.httpPost('/login/',dados)
  if (!resultado.token) return { message: resultado.error }
  return { message: 'ok', token: resultado.token};
}
