import HttpStatusCodes from '@src/shared/http-status-code';
import { IReq, IRes } from './types/express';
import check from './shared/check';
import Usuario from '@src/model/usuario';

import obterUsuario from '@src/service/usuario/obter-usuario';
import obterUsuarios from '@src/service/usuario/obter-usuarios';
import novoUsuario from '@src/service/usuario/novo-usuario';
import atualizarUsuario from '@src/service/usuario/atualizar-usuario';
import atualizarUsuarioPerfil from '@src/service/usuario/atualizar-usuario-perfil';
import atualizarUsuarioSenha from '@src/service/usuario/atualizar-usuario-senha';
import excluirUsuario from '@src/service/usuario/excluir-usuario';


async function obterTodos(_: IReq, res: IRes) {
  const usuarios = await obterUsuarios.executar()
  return res.status(HttpStatusCodes.OK).send(usuarios)
}

async function obter(req: IReq, res: IRes) {
  const id = check.isUid(req.params, 'id')
  const usuario = await obterUsuario.executar(id)
  return res.status(HttpStatusCodes.OK).send(usuario)
}

async function novo(req: IReq, res: IRes) {
  const usuario = check.isValid(req.body, 'usuario', Usuario.ehUsuario)
  await novoUsuario.executar(usuario)
  return res.status(HttpStatusCodes.CREATED).end()
}

async function atualizar(req: IReq, res: IRes) {
  const usuario = check.isValid(req.body, 'usuario', Usuario.ehUsuario)
  await atualizarUsuario.executar(usuario)
  return res.status(HttpStatusCodes.OK).end();
}

async function atualizarPerfil(req: IReq, res: IRes) {
  const usuario = check.isValid(req.body, 'usuario', Usuario.ehUsuarioPerfil)
  const usuarioAtualizado = await atualizarUsuarioPerfil.executar(usuario)
  return res.status(HttpStatusCodes.OK).send(usuarioAtualizado)
}

async function atualizarSenha(req: IReq, res: IRes) {
  const usuario = check.isValid(req.body, 'usuario', Usuario.ehUsuarioSenha)
  await atualizarUsuarioSenha.executar(usuario)
  return res.status(HttpStatusCodes.OK).end()
}

async function excluir(req: IReq, res: IRes) {
  const id = check.isUid(req.params, 'id')
  await excluirUsuario.executar(id)
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
