import { ControllerErro } from '@src/shared/erro'
import HttpStatusCodes from '@src/shared/http-status-code'
import { IUsuario } from '@src/model/usuario'
import RepositorioUsuario from '@src/repository/repositorio-usuario'
import jwt from 'jsonwebtoken'

const TOKEN_NAO_ENCONTRADO = 'Token não informado'
const TOKEN_INVALIDO = 'Token inválido'
const USUARIO_NAO_ENCONTRADO = 'Usuário não encontrado'

const repo = new RepositorioUsuario()

export default async function usuario(req: any, res: any, next: any) {
    try {
        const segredo = process.env.ACCESS_TOKEN_SECRET ?? ''
        const headerAuthon = req.headers['authorization']
        const token = headerAuthon?.split(' ')[1]

        if (!token) {
            throw new ControllerErro(HttpStatusCodes.UNAUTHORIZED, TOKEN_NAO_ENCONTRADO)
        }

        const payload = jwt.verify(token, segredo as 'Secret') as IUsuario
        if (!payload) {
            throw new ControllerErro(HttpStatusCodes.UNAUTHORIZED, TOKEN_INVALIDO)
        }
     
        const usuario = await repo.buscarPorEmail(payload.email)
        delete usuario.senha

        if (!usuario) {
            throw new ControllerErro(HttpStatusCodes.UNAUTHORIZED, USUARIO_NAO_ENCONTRADO)
        }

        req.usuario = usuario
        next()

    } catch (error) {
        throw new ControllerErro(HttpStatusCodes.UNAUTHORIZED, TOKEN_INVALIDO)
    }
}