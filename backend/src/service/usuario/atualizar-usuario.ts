import { IUsuario } from '@src/model/usuario';
import { ServiceErro } from '@src/shared/erro';
import RepositorioUsuario from '@src/repository/repositorio-usuario';

export const USER_NOT_FOUND_ERR = 'Usuário não encontrado';

const repo = new RepositorioUsuario()

async function executar(usuario: IUsuario): Promise<void> {
  const resultadoUsuario = await repo.obterPorId(usuario.id);

  if (!resultadoUsuario) throw new ServiceErro(USER_NOT_FOUND_ERR)

  return await repo.alterar(usuario);
}

export default {
  executar,
} as const

