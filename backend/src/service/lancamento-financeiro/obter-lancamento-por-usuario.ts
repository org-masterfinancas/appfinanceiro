import { ServiceErro } from "@src/shared/erro"
import { ILancamentoFinanceiro } from "@src/model/lancamento-financeiro"
import RepositorioLancamentoFinanceiro from "@src/repository/repositorio-lancamento-financeiro"

const repo = new RepositorioLancamentoFinanceiro()

async function executar(idLancamento: string, usuarioId: string): Promise<ILancamentoFinanceiro>{
    const lancamento = repo.obterLancamentoPorUsuario(idLancamento, usuarioId)
    
    if (!lancamento) {
        throw new ServiceErro('Lançamento financeiro não encontrado')
    }
    
    return lancamento
}

export default {
    executar
} as const

