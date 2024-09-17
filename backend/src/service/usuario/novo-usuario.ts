import { ServiceErro } from '@src/shared/erro';
import { IUsuario } from '@src/model/usuario';
import RepositorioUsuario from '@src/repository/repositorio-usuario';
import Id from '@src/shared/id';
import Senha from '@src/shared/senha';
import validator from 'validator';

const USUARIO_EXISTE = 'Usuário já existe'
const SENHA_INVALIDA = 'Nível da senha fraca'

const repo = new RepositorioUsuario()

async function executar(usuario: IUsuario): Promise<void> {

  const senhaValida = validator.isStrongPassword(usuario.senha)
  if (!senhaValida) throw new ServiceErro(SENHA_INVALIDA)

  const usuarioExiste = await repo.buscarPorEmail(usuario.email);
  if (usuarioExiste) throw new ServiceErro(USUARIO_EXISTE)
  
  const senhaCriptografada = await Senha.criptografar(usuario.senha)

  const novoUsuario = {
    ...usuario,
    id: Id.novo(),
    senha: senhaCriptografada
  }

  await repo.adicionar(novoUsuario)
}

export default {
  executar
} as const

