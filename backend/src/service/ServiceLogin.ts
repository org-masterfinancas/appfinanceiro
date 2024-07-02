import RepositorioUsuario from "../Repositorio/RepositorioUsuario"
import jwt from 'jsonwebtoken'

export default class ServiceLogin {

    private repo: RepositorioUsuario

    constructor() {
        this.repo = new RepositorioUsuario()
    }

    async entrar(email: string, senha: string) {
        
        const segredo = process.env.ACCESS_TOKEN_SECRET ?? ''

        let resultado = { sucesso: false, mensagem: "", token: "" }

        const login = await this.repo.loginSucesso(email, senha)
        const id = login.idusuario

        if (login.result) {
            const token = jwt.sign(
            { email, id }, segredo as 'Secret')
            resultado = { sucesso: true, mensagem: "Usuário logado com sucesso.", token: token }
            this.repo.atualizarToken(email, token )
            return resultado
        } else {
            resultado = { sucesso: false, mensagem: "usuário ou senha inválida.", token: "" }
            return resultado
        }
    }

    async gerarTokenInternamente(id: string){

        const usuario = await this.repo.obterPorId(id)
        const result = !!usuario
        if(result){
            await this.entrar(usuario.email, usuario.senha)      
            return true
        }else{
            return false
        }
    }

}

