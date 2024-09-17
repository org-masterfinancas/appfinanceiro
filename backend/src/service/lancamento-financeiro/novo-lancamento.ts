import { ILancamentoFinanceiro } from "@src/model/lancamento-financeiro"
import RepositorioLancamentoFinanceiro from "@src/repository/repositorio-lancamento-financeiro"
import Id from "@src/shared/id"

const repo = new RepositorioLancamentoFinanceiro()

async function executar(lancamento: ILancamentoFinanceiro, usuarioId: string): Promise<void> {
    const novoLancamento = {
        ...lancamento,
        id: Id.novo(),
    }

    await repo.NovoPorUsuario(novoLancamento, usuarioId)
}

export default {
    executar
} as const



