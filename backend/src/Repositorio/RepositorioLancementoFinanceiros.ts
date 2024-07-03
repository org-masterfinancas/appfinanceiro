import { PrismaClient } from "@prisma/client";
import LancementoFinaceiros from "../model/LancamentoFinanceiro";

export default class RepositorioLancamentoFinanceiro {
    private db: PrismaClient

    constructor() {
        this.db = new PrismaClient()
    }

    async obterPorUsuario(usuarioId: string): Promise<any> {

        return this.db.lancamentoFinanceiros.findMany({
            where: { usuarioId: String(usuarioId) },
            include: {
                usuario: {
                    select: {
                        nome: true
                    }
                }
            }
        })
    }

    async obterUmPorUsuario(idLancamento: string, usuarioId: string): Promise<any> {

        const usuario = this.db.lancamentoFinanceiros.findUnique({
            where: { id: idLancamento, usuarioId: usuarioId },
            include: {
                usuario: {
                    select: {
                        nome: true
                    }
                }
            }
        })
        return usuario
    }



    async NovoPorUsuario(lancamentoFinanceiro: LancementoFinaceiros, usuarioId: string): Promise<any> {
        const { id, descricaoLancamento, valorLancamento, tipoLancamento, statusLancamento, dataCriacaoLancamento } = lancamentoFinanceiro

        const lancamento = await this.db.lancamentoFinanceiros.create({
            data: {
                id,
                descricaoLancamento,
                statusLancamento,
                tipoLancamento,
                valorLancamento,
                dataCriacaoLancamento,
                usuario: { connect: { id: usuarioId } },
            },
            include: {
                usuario: {
                    select: {
                        nome: true
                    }
                }
            }
        })
        return lancamento
    }

    async alterarPorUsuario(lancamentoFinanceiro: LancementoFinaceiros, usuarioId: string): Promise<any> {
        const { id, ...data } = lancamentoFinanceiro
        try {
            const lancamentoAlterar = await this.db.lancamentoFinanceiros.update({
                where: {
                    id,
                    usuarioId: usuarioId
                },
                data,
                include: {
                    usuario: {
                        select: {
                            nome: true
                        }
                    }
                }
            })
            return lancamentoAlterar
        } catch (error) {
            console.error('Erro ao atualizar o usuario', error)
        }

    }

    async excluirPorUsuario(idLancamento: string, usuarioId: string): Promise<any> {
        const lancamento = await this.db.lancamentoFinanceiros.delete({
            where: {
                id: idLancamento,
                usuarioId: usuarioId,
            },
            include: {
                usuario: {
                    select: {
                        nome: true
                    }
                }
            }
        })
        return lancamento
    }


    async lancamentoExistePorUsuario(idLancamento: string, usuarioId: string): Promise<boolean> {
        const lancamento = await this.db.lancamentoFinanceiros.findUnique({
            where: {
                id: idLancamento,
                usuarioId: usuarioId,
            }
        })

        return !!lancamento;
    }



    //

    async obterTodos(): Promise<any> {
        const lancamentos = await this.db.lancamentoFinanceiros.findMany({
            include: {
                usuario: {
                    select: {
                        nome: true
                    }
                }
            }
        })
        return lancamentos
    }

    async obterPorId(id: any): Promise<any> {

        return await this.db.lancamentoFinanceiros.findUnique({
            where: { id: String(id) },
            include: {
                usuario: {
                    select: {
                        nome: true
                    }
                }
            }
        })
    }
}

