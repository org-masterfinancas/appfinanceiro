import { PrismaClient } from "@prisma/client"
import DBConnection from "../shared/DbConnection";
import Usuario from "../model/Usuario"
import { Console } from "console";

export default class RepositorioUsuario {

    private db: PrismaClient

    constructor() {
        this.db = DBConnection.getConnection();
    }

    async obterPorId(id: any): Promise<any> {

        return await this.db.usuarios.findUnique({
            where: { id: String(id) },
            select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                perfil: true,
                avatar: true,
            }
        })
    }

    async obterPorEmail(email: string): Promise<any> {
        const usuario = await this.db.usuarios.findUnique({
            where: { email },
            select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                perfil: true,
                avatar: true,
            }
        })
        return usuario
    }
    async ObterTodos(): Promise<any[]> {

        const resultado = await this.db.usuarios.findMany({
            select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                perfil: true,
                avatar: true,

            }
        })
        return resultado

    }

    async adicionar(usuario: Usuario): Promise<any> {
        const resultado = await this.db.usuarios.create({
            data: usuario,
            select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                perfil: true,
                avatar: true,
            }
        })
        return resultado

    }

    async alterar(usuario: Usuario): Promise<any> {
        const { id, ...data } = usuario

        try {
            const usuarioAtualizar = await this.db.usuarios.update({
                where: { id },
                data,
                select: {
                    id: true,
                    nome: true,
                    sobrenome: true,
                    email: true,
                    perfil: true,
                    avatar: true,
                }
            })
            return usuarioAtualizar
        } catch (error) {
            console.error('Erro ao atualizar o usuario', error)
        }
    }

    async excluir(id: string): Promise<any> {
        const usuario = await this.db.usuarios.delete({
            where: {
                id
            },
            select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                perfil: true,
                avatar: true,
            }
        })
        return usuario
    }

    async usuarioExiste(id: string): Promise<boolean> {
        const usuario = await this.db.usuarios.findUnique({
            where: { id },
            select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                perfil: true,
                avatar: true,
            }
        })
        if (!!usuario) {
            return true
        }
        return false
    }

    async obterParaVerficarSenha(email: any): Promise<any> {
        return await this.db.usuarios.findUnique({
            where: { email: String(email) }
        })
    }

    async obterParaVerficarSenhaPorId(id: any): Promise<any> {
        return await this.db.usuarios.findUnique({
            where: { id: String(id) }
        })
    }
}

