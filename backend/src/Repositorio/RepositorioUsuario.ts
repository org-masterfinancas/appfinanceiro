import { PrismaClient } from "@prisma/client"
import Usuario from "../model/Usuario"

export default class RepositorioUsuario {

    private db: PrismaClient

    constructor() {
        this.db = new PrismaClient()
    }


    async ObterTodos(): Promise<Usuario[]> {

        const resultado = await this.db.usuarios.findMany()
        return resultado

    }

    async adicionar(usuario: Usuario): Promise<any> {
        const resultado = await this.db.usuarios.create({
            data: usuario
        })
        return resultado

    }

    async alterar(usuario: Usuario): Promise<any> {
        const { id, ...data } = usuario

        try {
            const usuarioAtualizar = await this.db.usuarios.update({
                where: { id },
                data
            })
        } catch (error) {
            console.error('Erro ao atualizar o usuario', error)
        }
    }

    async excluir(id: string): Promise<any> {
        const usuario = await this.db.usuarios.delete({
            where: {
                id
            },
        })
        return usuario
    }

    async usuarioExiste(id: string): Promise<boolean> {
        const usuario = await this.db.usuarios.findUnique({
            where: { id }
        })
        if (!!usuario) {
            return true
        }
        return false
    }

    async obterPorId(id: any): Promise<any> {

        return await this.db.usuarios.findUnique({
            where: { id: String(id) }
        })
    }

    async obterPorEmail(email: string): Promise<any> {
        const usuario = await this.db.usuarios.findUnique({
            where: { email }
        })
        return usuario
    }
}

