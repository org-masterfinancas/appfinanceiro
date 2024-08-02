import Id from  '../shared/Id'
import Senha from '../shared/Senha'

export default class Usuario {
    id: string
    nome: string
    sobrenome: string
    email: string
    senha?: string | null
    perfil?: string
    avatar?: string
    dataCriacao: Date
    
    constructor(nome: string, sobrenome: string, email: string, senha: string, perfil?: string, avatar?: string, id?: string){
        this.id = id? id : Id.novo()
        this.nome = nome
        this.sobrenome = sobrenome
        this.email = email
        this.senha = senha
        this.perfil = perfil
        this.avatar = avatar
        this.dataCriacao = new Date()
    }
}