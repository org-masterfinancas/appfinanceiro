import { Router } from 'express';
import paths from '../shared/paths';
import autenticacao from '@src/middleware/autenticacao';
import RotaLancamentoFinanceiro from './lancamento-financeiro';
import RotaUsuario from './usuario';
import RotaAutenticacao from './autenticacao';

const apiRouter = Router();

apiRouter.use(paths.entrar, RotaAutenticacao)
apiRouter.use(paths.usuarios.base, autenticacao, RotaUsuario);
apiRouter.use(paths.lancamentoFinanceiros.base, autenticacao, RotaLancamentoFinanceiro);

export default apiRouter