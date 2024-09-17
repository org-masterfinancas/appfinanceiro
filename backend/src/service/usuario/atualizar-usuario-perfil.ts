import { IUsuario } from '@src/model/usuario';
import { ServiceErro } from '@src/shared/erro';
import RepositorioUsuario from '@src/repository/repositorio-usuario';

export const USUARIO_NAO_ENCONTRADO = 'Usuário não encontrado';

const repo = new RepositorioUsuario()

async function executar(usuario: IUsuario): Promise<IUsuario> {
  const resultadoUsuario = await repo.obterPorId(usuario.id);

  if (!resultadoUsuario) throw new ServiceErro(USUARIO_NAO_ENCONTRADO)
  
  const usuarioAtualizado  = {
    id: usuario.id,
    nome: usuario.nome,
    sobrenome: usuario.sobrenome,
    avatar: usuario.avatar,
  } as IUsuario

  return  await repo.alterarPerfil(usuarioAtualizado);
}

export default {
  executar,
} as const

