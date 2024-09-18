import { IUsuario } from '@src/model/usuario';
import RepositorioUsuario from '@src/repository/repositorio-usuario';
import { ServiceErro } from '@src/shared/erro';

const repo = new RepositorioUsuario()

async function executar(id: string): Promise<IUsuario> {
  const usuario = await repo.obterPorId(id)
  if (usuario === null) {
    throw new ServiceErro("Usuário não encontrado")
  }
  delete usuario.dataCriacao
  delete usuario.senha
  return usuario
}

export default {
  executar,
} as const

