import { ServiceErro } from '@src/shared/erro'
import { ILancamentoFinanceiro } from '@src/model/lancamento-financeiro'
import RepositorioLancamentoFinanceiro from "@src/repository/repositorio-lancamento-financeiro"

const LANCAMENTO_NAO_ENCONTRADO = 'Lançamento informado não foi Localizado'

const repo = new RepositorioLancamentoFinanceiro()

async function executar(idLancamento: string, usuarioId: string): Promise<void> {
    const burscarLancamento = await repo.obterLancamentoPorUsuario(idLancamento, usuarioId)
    
    if (!burscarLancamento) {
        throw new ServiceErro(LANCAMENTO_NAO_ENCONTRADO)
    }

    await repo.excluirPorUsuario(idLancamento, usuarioId)
}

export default {
    executar
} as const