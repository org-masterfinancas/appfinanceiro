import { Router } from 'express';
import paths from '../shared/paths';
import usuario from '@src/controller/usuario';

const usuarioRota = Router();

usuarioRota.get(paths.usuarios.obterTodos, usuario.obterTodos)
usuarioRota.get(paths.usuarios.obter, usuario.obter)        
usuarioRota.post(paths.usuarios.novo, usuario.novo)
usuarioRota.put(paths.usuarios.atualizar, usuario.atualizar)
usuarioRota.put(paths.usuarios.atualizarPerfil, usuario.atualizarPerfil)
usuarioRota.put(paths.usuarios.atualizarSenha, usuario.atualizarSenha)
usuarioRota.delete(paths.usuarios.excluir, usuario.excluir);

export default usuarioRota