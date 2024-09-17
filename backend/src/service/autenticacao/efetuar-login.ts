import {  ServiceErro } from '@src/shared/erro';
import { IUsuario } from '@src/model/usuario';
import RepositorioUsuario from '@src/repository/repositorio-usuario';
import Senha from '@src/shared/senha';

export const USER_NOT_FOUND_ERR = 'Conta inexistente';
export const USUARIO_SENHA_INVALIDA = 'Senha inválida';

const repo = new RepositorioUsuario()

async function executar(email: string, senha: string): Promise<IUsuario> {
  const usuario = await repo.buscarPorEmail(email)
  if (!usuario) throw new ServiceErro(USER_NOT_FOUND_ERR)

  const compararSenha = await Senha.comparar(senha, usuario.senha)
  if (!compararSenha) throw new ServiceErro(USUARIO_SENHA_INVALIDA)

    delete usuario.senha
  return usuario
}

export default {
  executar
} as const

