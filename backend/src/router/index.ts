import { Router } from 'express';
import paths from '../shared/paths';
import autenticacao from '@src/middleware/autenticacao';
import RotaLancamentoFinanceiro from './lancamento-financeiro';
import RotaUsuario from './usuario';
import RotaAutenticacao from './autenticacao';
import { ControllerErro } from '@src/shared/erro';
import HttpStatusCodes from '@src/shared/http-status-code';

const apiRouter = Router();

apiRouter.use(paths.entrar, RotaAutenticacao)
apiRouter.use(paths.usuarios.base, autenticacao, RotaUsuario);
apiRouter.use(paths.lancamentoFinanceiros.base, autenticacao, RotaLancamentoFinanceiro);

apiRouter.use((req, res, next) => {
   throw new ControllerErro(HttpStatusCodes.NOT_FOUND, `path: ${req.url}, não existe` )
  })

export default apiRouter