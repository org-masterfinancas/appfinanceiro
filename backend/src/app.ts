import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors from 'cors'
import HttpStatusCodes from './shared/http-status-code';
import { ControllerErro, ModelErro, ServiceErro } from './shared/erro';
import paths from './shared/paths';
import  apiRouter  from './router/';
import { configDotenv } from 'dotenv';

configDotenv()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(paths.base, apiRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let status = HttpStatusCodes.INTERNAL_SERVER_ERROR
  let error = ''

  if (err instanceof ModelErro || err instanceof ServiceErro) {
     error = err.message
     status = HttpStatusCodes.BAD_REQUEST
  }

  if (err instanceof ControllerErro) {
    status = err.status
    error = err.message
  }
  
  res.status(status).send({
    statusCode: status,
    timestamp: new Date().toISOString(),
    path: req.url,
    error: error ? error : err.message,
  })
  console.error('Erro capturado pelo middleware:', err);
})

export default app;