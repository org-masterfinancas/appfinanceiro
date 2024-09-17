import { PrismaClient, Usuarios } from "@prisma/client"
import ConexaoBD from "../shared/conexao-bd";
import { IUsuario } from "@src/model/usuario";

export default class RepositorioUsuario {
    private db: PrismaClient

    constructor() {
        this.db = ConexaoBD.getConnection();
    }

    async obterPorId(id: string): Promise<IUsuario | null> {
        const usuario = await this.db.usuarios.findUnique({
            where: { id: id },
        })
        return usuario
    }

    async buscarPorEmail(email: string): Promise<IUsuario | null> {
        const usuario = await this.db.usuarios.findUnique({
            where: { email },
        })
        return usuario;
    }

    async ObterTodos(): Promise<Usuarios[]> {
        const resultado = await this.db.usuarios.findMany()
        return resultado.map((usuario) => {
            delete usuario.senha
            return usuario
        })
    }

    async adicionar(usuario: IUsuario): Promise<void> {
        await this.db.usuarios.create({
            data: usuario,
        })
    }

    async alterar(usuario: IUsuario): Promise<void> {
        const { id, ...data } = usuario
        await this.db.usuarios.update({
            where: { id },
            data,
        })
    }

    async alterarPerfil(usuario: IUsuario): Promise<IUsuario> {
        const { id, ...data } = usuario
        const usuarioAutalizado = await this.db.usuarios.update({
            where: { id },
            data,
        })
        delete usuarioAutalizado.senha
        delete usuarioAutalizado.dataCriacao
        return usuarioAutalizado

    }

    async alterarSenha(usuario: IUsuario): Promise<void> {
        const { id, ...data } = usuario
        await this.db.usuarios.update({
            where: { id },
            data,
        })
    }

    async excluir(id: string): Promise<void> {
        await this.db.usuarios.delete({
            where: {
                id
            },
        })
    }
}

