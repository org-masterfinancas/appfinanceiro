import { ServiceErro } from '@src/shared/erro';
import RepositorioUsuario from '@src/repository/repositorio-usuario';

export const USUARIO_NAO_ENCONTRADO = 'Usuário não encontrado';

const repo = new RepositorioUsuario()

async function executar(id: string): Promise<void> {
  const usuarioExiste = await repo.obterPorId(id);

  if (!usuarioExiste) throw new ServiceErro(USUARIO_NAO_ENCONTRADO)

  repo.excluir(id);
}

export default {
  executar,
} as const

