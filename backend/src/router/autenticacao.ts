import { Router } from 'express';
import paths from '../shared/paths';
import login from '@src/controller/autenticacao';
import somentePost from '@src/middleware/somente-post';

const autenticacaoRota = Router();

autenticacaoRota.post(paths.base, login.entrar)
autenticacaoRota.use(paths.base, somentePost)

export default autenticacaoRota