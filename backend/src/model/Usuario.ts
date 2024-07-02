import Id from  '../shared/Id'

export default class Usuario {
    id: string
    nome: string
    email: string
    senha?: string | null
    token?: string | null
    dataCriacao: Date
    
    constructor(nome: string, email: string, senha: string ){
        this.id = Id.novo()
        this.nome = nome
        this.email = email
        this.senha= senha
        this.dataCriacao = new Date()
    }
}