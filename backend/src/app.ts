import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors from 'cors'
import autenticacao from './middleware/MiddlewareAutenticacao'
import rotasV1LancamentoFinanceiros from './router/RouterV1LancamentoFinaceiros'
import rotasV2LancamentoFinanceiros from './router/RouterV2LancamentoFinaceiros'

import rotasLogin from './router/Routerlogin';
import rotasUsuarios from './router/RouterUsuarios';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/v1/lancamentoFinanceiros', rotasV1LancamentoFinanceiros);
app.use('/v2/lancamentoFinanceiros', autenticacao, rotasV2LancamentoFinanceiros);
app.use('/usuarios', rotasUsuarios);
app.use('/login', rotasLogin);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { name, message } = err;
  if (name === 'ValidationError') {
    res.status(400).json({ error: message });
    return;
  }
  if (err.message === '404') {
    res.sendStatus(404);
    return;
  }
  console.error('Erro capturado pelo middleware:', err);
  res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
});

export default app;
