import { IUsuario } from '@src/model/usuario';
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      usuarioId: string;
      usuario: IUsuario
    }
  }
}
