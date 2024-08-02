import RepositorioUsuario from "../Repositorio/RepositorioUsuario"
import jwt from 'jsonwebtoken'
import Senha from "../shared/Senha"
import Usuario from "../model/Usuario"
import { log } from "console"

export default class ServiceLogin {

    private repo: RepositorioUsuario

    constructor() {
        this.repo = new RepositorioUsuario()
    }

    async entrar(email: string, senha: string) {

        const segredo = process.env.ACCESS_TOKEN_SECRET ?? ''

        let resultado = { sucesso: false, mensagem: "", token: "" }

        const login: any = await this.loginSucesso(email, senha)

        if (login.result) {
            const { nome, sobrenome, email, avatar, perfil } = login.usuario
            
            const token = jwt.sign(
                { nome, sobrenome, email, avatar, perfil, }, segredo as 'Secret')

            resultado = { sucesso: true, mensagem: "Usuário logado com sucesso.", token: token }
            return resultado
        } else {

            resultado = { sucesso: false, mensagem: "usuário ou senha inválida.", token: "" }
            return resultado
        }
    }

    async loginSucesso(email: string, senha: string) {
        const usuario = await this.repo.obterParaVerficarSenha(email)

        const resultUsuario = !!usuario

        if (!resultUsuario) {
            return { result: false }
        } else {
            const resultSenha = Senha.comparar(senha, usuario.senha)
            if (resultSenha) {
                const { senha, ...usuarioSemSenha } = usuario;
                return { result: true, usuario: usuarioSemSenha }
            }
            return { result: false }
        }
    }
}