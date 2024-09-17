import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors from 'cors'
import HttpStatusCodes from './shared/http-status-code';
import { ControllerErro, ModelErro, ServiceErro } from './shared/erro';
import paths from './shared/paths';
import  apiRouter  from './router/';
import check from './controller/shared/check';

/**
 * Tmp
 */
import RepositorioUsuario from './repository/repositorio-usuario';
const repo = new RepositorioUsuario()
/*/
 */

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(paths.base, apiRouter)

/**
 * 
 */
app.get('/tmp/:id', async (req: Request, res: Response) =>{
  const id = check.isStr(req.params, 'id')

  res.status(200).json( await repo.obterPorId(id))
})
/**
 * 
 */

app.use((
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {

  let status = HttpStatusCodes.BAD_REQUEST

  if (err instanceof ModelErro) {
    return res.status(status).json({ error: err.message })
  }

  if (err instanceof ControllerErro) {
    status = err.status
    return res.status(status).json({ error: err.message })
  }

  if (err instanceof ServiceErro) {
    return res.status(status).json({ error: err.message })
  }

  console.error('Erro capturado pelo middleware:', err);
  res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
})

export default app;