import { IUsuario } from '@src/model/usuario';
import RepositorioUsuario from '@src/repository/repositorio-usuario';

const repo = new RepositorioUsuario()

async function executar(): Promise<IUsuario[]> {
  return repo.ObterTodos()
}

export default {
  executar,
} as const

