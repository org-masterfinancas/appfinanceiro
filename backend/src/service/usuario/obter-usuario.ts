import { IUsuario } from '@src/model/usuario';
import RepositorioUsuario from '@src/repository/repositorio-usuario';

const repo = new RepositorioUsuario()

async function executar(id: string): Promise<IUsuario | null> {
  const usuario = await repo.obterPorId(id)
  if (usuario === null) {
    return usuario
  }
  delete usuario.dataCriacao
  delete usuario.senha
  return usuario
}

export default {
  executar,
} as const

