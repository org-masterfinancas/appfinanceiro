import RepositorioUsuario from "../Repositorio/RepositorioUsuario"
import jwt from 'jsonwebtoken'
import Senha from "../shared/Senha"

export default class ServiceLogin {

    private repo: RepositorioUsuario

    constructor() {
        this.repo = new RepositorioUsuario()
    }

    async entrar(email: string, senha: string) {

        const segredo = process.env.ACCESS_TOKEN_SECRET ?? ''

        let resultado = { sucesso: false, mensagem: "", token: "" }

        const login = await this.loginSucesso(email, senha)
        const id = login.idusuario

        if (login.result) {
            const token = jwt.sign(
                { email, id }, segredo as 'Secret')
            resultado = { sucesso: true, mensagem: "Usuário logado com sucesso.", token: token }
            return resultado
        } else {
            resultado = { sucesso: false, mensagem: "usuário ou senha inválida.", token: "" }
            return resultado
        }
    }

    async loginSucesso(email: string, senha: string) {
        const usuario = await this.repo.obterPorEmail(email)
        const resultUsuario = !!usuario
        
        console.log(usuario)
        if (!resultUsuario) {
            return { result: false }
        } else {
            const resultSenha = Senha.comparar(senha, usuario.senha)
            if (resultSenha) {
                return { result: true, idusuario: usuario.id }
            }
            return {result: false}
        }

     
    }
}

