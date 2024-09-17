import { PrismaClient } from "@prisma/client";
import DBConnection from "../shared/conexao-bd";
import { ILancamentoFinanceiro } from "../model/lancamento-financeiro";

export default class RepositorioLancamentoFinanceiro {
    private db: PrismaClient

    constructor() {
        this.db = DBConnection.getConnection();
    }

    async obterLancamentosPorUsuario(usuarioId: string): Promise<ILancamentoFinanceiro[] | null> {
        return this.db.lancamentoFinanceiros.findMany({
            where: {
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
    }

    async obterLancamentoPorUsuario(idLancamento: string, usuarioId: string): Promise<ILancamentoFinanceiro | null> {

        const lancamento = this.db.lancamentoFinanceiros.findUnique({
            where: { id: idLancamento, usuarioId: usuarioId },
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

    async NovoPorUsuario(lancamentoFinanceiro: ILancamentoFinanceiro, usuarioId: string): Promise<void> {
        await this.db.lancamentoFinanceiros.create({
            data: {
                id: lancamentoFinanceiro.id,
                descricaoLancamento: lancamentoFinanceiro.descricaoLancamento,
                statusLancamento: lancamentoFinanceiro.statusLancamento,
                tipoLancamento: lancamentoFinanceiro.tipoLancamento,
                valorLancamento: lancamentoFinanceiro.valorLancamento,
                dataCriacaoLancamento: lancamentoFinanceiro.dataCriacaoLancamento,
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
    }

    async alterarPorUsuario(lancamentoFinanceiro: ILancamentoFinanceiro, usuarioId: string): Promise<void> {
        const { id, ...data } = lancamentoFinanceiro
        await this.db.lancamentoFinanceiros.update({
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
    }

    async excluirPorUsuario(idLancamento: string, usuarioId: string): Promise<void> {
        await this.db.lancamentoFinanceiros.delete({
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
    }

    async existelancamentoPorUsuario(idLancamento: string, usuarioId: string): Promise<ILancamentoFinanceiro | null> {
        const lancamento = await this.db.lancamentoFinanceiros.findUnique({
            where: {
                id: idLancamento,
                usuarioId: usuarioId,
            }
        })

        return lancamento
    }



    //

    async obterTodos(): Promise<ILancamentoFinanceiro[]> {
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

    async obterPorId(id: any): Promise<ILancamentoFinanceiro> {

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

