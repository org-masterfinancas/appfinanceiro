import LancamentoFinanceiro from "../model/lancamento-financeiro";
import { IReq, IRes } from "./types/express";
import check from "./shared/check";
import obterLancamentoPorUsuario from '@src/service/lancamento-financeiro/obter-lancamento-por-usuario';
import obterLancamentosPorUsuario from '@src/service/lancamento-financeiro/obter-lancamentos-por-usuario';
import novoLancamento from '@src/service/lancamento-financeiro/novo-lancamento';
import atualizarLancamento from '@src/service/lancamento-financeiro/atualizar-lancamento';
import excluirLancamento from '@src/service/lancamento-financeiro/excluir-lancamento';
import HttpStatusCodes from "@src/shared/http-status-code";

async function obter(req: IReq, res: IRes) {
    const id = check.isUid(req.params, 'id');
    const usuarioId = req.usuario.id
    const lancamento = await obterLancamentoPorUsuario.executar(id, usuarioId)
    return res.status(HttpStatusCodes.OK).send(lancamento);
}

async function obterTodos(req: IReq, res: IRes) {
    const usuarioId = req.usuario.id
    const lancamentos = await obterLancamentosPorUsuario.executar(usuarioId, )
    return res.status(HttpStatusCodes.OK).send(lancamentos)
}

async function novo(req: IReq, res: IRes) {
    const lancamento = check.isValid(req.body, 'lancamentofinanceiro', LancamentoFinanceiro.isLancamentoFinanceiro)
    const usuarioId = req.usuario.id
    await novoLancamento.executar(lancamento, usuarioId)
    return res.status(HttpStatusCodes.CREATED).end();
}

async function atualizar(req: IReq, res: IRes) {
    const id = check.isUid(req.params, 'id');
    const lancamento = check.isValid(req.body, 'lancamentofinanceiro', LancamentoFinanceiro.isLancamentoFinanceiro)
    const usuarioId = req.usuario.id
    await atualizarLancamento.executar(lancamento, usuarioId)
    return res.status(HttpStatusCodes.OK).end()
}

async function excluir(req: IReq, res: IRes) {
    const id = check.isUid(req.params, 'id');
    const usuarioId = req.usuario.id
    await excluirLancamento.executar(id, usuarioId)
    return res.status(HttpStatusCodes.NO_CONTENT).send()
}

export default {
    obter,
    obterTodos,
    novo,
    atualizar,
    excluir,
} as const