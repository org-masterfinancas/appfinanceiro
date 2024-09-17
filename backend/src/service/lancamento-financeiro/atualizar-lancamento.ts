import { ServiceErro } from "@src/shared/erro"
import { ILancamentoFinanceiro } from "@src/model/lancamento-financeiro"
import RepositorioLancamentoFinanceiro from "@src/repository/repositorio-lancamento-financeiro";

const LANCAMENTO_NAO_ENCONTRADO = 'Lançamento informado não foi Localizado';

const repo = new RepositorioLancamentoFinanceiro()

    async function executar(lancamento: ILancamentoFinanceiro, usuarioId: string): Promise<void> {
        const buscarLancamento = await repo.obterLancamentoPorUsuario(lancamento.id, usuarioId)

        if (!buscarLancamento){
            throw new ServiceErro(LANCAMENTO_NAO_ENCONTRADO)
        }
        
        await repo.alterarPorUsuario(lancamento, usuarioId)
    }

export default {
    executar
} as const

   

