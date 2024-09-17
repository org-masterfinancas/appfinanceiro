import { ILancamentoFinanceiro } from "@src/model/lancamento-financeiro"
import RepositorioLancamentoFinanceiro from "@src/repository/repositorio-lancamento-financeiro"

const repo = new RepositorioLancamentoFinanceiro()

async function executar(idusuario: string): Promise<ILancamentoFinanceiro[] | null> {
    
    return repo.obterLancamentosPorUsuario(idusuario)
}

export default {
    executar 
} as const