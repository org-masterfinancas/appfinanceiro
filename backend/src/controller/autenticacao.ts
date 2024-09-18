import HttpStatusCodes from '@src/shared/http-status-code';
import { IReq, IRes } from './types/express';
import check from './shared/check';
import * as jwt from 'jsonwebtoken';
import EfetuarLogin from '@src/service/autenticacao/efetuar-login';

async function entrar(req: IReq, res: IRes) {
  const email = check.isEmail(req.body, 'email')
  const senha = check.isStr(req.body, 'senha')
  
  const usuario = await EfetuarLogin.executar(email, senha)
  
  const segredo = process.env.ACCESS_TOKEN_SECRET
  const token = jwt.sign(usuario, segredo, { expiresIn: '10d' })
  return res.status(HttpStatusCodes.OK).send({token})

}

export default {
  entrar,
} as const;
