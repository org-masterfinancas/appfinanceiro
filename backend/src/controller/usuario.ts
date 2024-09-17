import HttpStatusCodes from '@src/shared/http-status-code';
import { IReq, IRes } from './types/express';
import check from './shared/check';
import Usuario from '@src/model/usuario';

import BuscarUsuario from '@src/service/usuario/obter-usuario';
import BuscarUsuarios from '@src/service/usuario/obter-usuarios';
import NovoUsuario from '@src/service/usuario/novo-usuario';
import AlterarUsuario from '@src/service/usuario/atualizar-usuario';
import AlterarUsuarioPerfil from '@src/service/usuario/atualizar-usuario-perfil';
import AlterarUsuarioSenha from '@src/service/usuario/atualizar-usuario-senha';
import ExcluirUsuario from '@src/service/usuario/excluir-usuario';


async function obterTodos(_: IReq, res: IRes) {
  const usuarios = await BuscarUsuarios.executar()
  return res.status(HttpStatusCodes.OK).send(usuarios)
}

async function obter(req: IReq, res: IRes) {
  const id = check.isUid(req.params, 'id')
  const usuario = await BuscarUsuario.executar(id)
  if (usuario) return res.status(HttpStatusCodes.OK).json(usuario)
  return res.status(HttpStatusCodes.NOT_FOUND).send({ error: "Usuário não encontrado!" })
}

async function novo(req: IReq, res: IRes) {
  const usuario = check.isValid(req.body, 'usuario', Usuario.ehUsuario)
  await NovoUsuario.executar(usuario)
  return res.status(HttpStatusCodes.CREATED).end()
}

async function atualizar(req: IReq, res: IRes) {
  const usuario = check.isValid(req.body, 'usuario', Usuario.ehUsuario)
  await AlterarUsuario.executar(usuario)
  return res.status(HttpStatusCodes.OK).end();
}

async function atualizarPerfil(req: IReq, res: IRes) {
  const usuario = check.isValid(req.body, 'usuario', Usuario.ehUsuarioPerfil)
  const usuarioAtualizado = await AlterarUsuarioPerfil.executar(usuario)
  return res.status(HttpStatusCodes.OK).send(usuarioAtualizado)
}

async function atualizarSenha(req: IReq, res: IRes) {
  const usuario = check.isValid(req.body, 'usuario', Usuario.ehUsuarioSenha)
  await AlterarUsuarioSenha.executar(usuario)
  return res.status(HttpStatusCodes.OK).end()
}

async function excluir(req: IReq, res: IRes) {
  const id = check.isUid(req.params, 'id')
  await ExcluirUsuario.executar(id)
  return res.status(HttpStatusCodes.NO_CONTENT).end()
}

export default {
  obter,
  obterTodos,
  novo,
  atualizar,
  atualizarPerfil,
  atualizarSenha,
  excluir,
} as const;
