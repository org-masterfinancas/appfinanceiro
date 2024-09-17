import { IUsuario } from '@src/model/usuario';
import { ServiceErro } from '@src/shared/erro';
import RepositorioUsuario from '@src/repository/repositorio-usuario';
import Senha from '@src/shared/senha';

export const USER_NOT_FOUND_ERR = 'Usuário não encontrado';
export const USUARIO_SENHA_INVALIDA = 'Senha atual inválida';

const repo = new RepositorioUsuario()

async function executar(usuario: IUsuario): Promise<void> {
  const resultadoUsuario = await repo.obterPorId(usuario.id);
  if (!resultadoUsuario) throw new ServiceErro(USER_NOT_FOUND_ERR)

  const compararSenha = await Senha.comparar(usuario.senha, resultadoUsuario.senha)
  if (!compararSenha) throw new ServiceErro(USUARIO_SENHA_INVALIDA)

  const novaSenha = await Senha.criptografar(usuario.novaSenha)

  const usuarioAtualizado = {
    id: usuario.id,
    senha: novaSenha,
  } as IUsuario

   await repo.alterarSenha(usuarioAtualizado);
}

export default {
  executar,
} as const

