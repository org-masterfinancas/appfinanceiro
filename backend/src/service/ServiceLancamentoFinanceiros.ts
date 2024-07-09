import RepositorioLancamentoFinaceiros from '../Repositorio/RepositorioLancamentoFinanceiros'
import LancamentoFinaceiros from '../model/LancamentoFinanceiro'

export default class ServiceLancamentoFinaceiros {

    private repo: RepositorioLancamentoFinaceiros

    constructor() {
        this.repo = new RepositorioLancamentoFinaceiros();
    }

    async ObterTodosDeUmUsuario(idusuario: string, status: string): Promise<any> {
        return this.repo.obterPorUsuario(idusuario, status)
    }

    async ObterUmPorUsuario(idLancamento: string, usuarioId: string){
        return this.repo.obterUmPorUsuario(idLancamento, usuarioId)
    }

    async Novo(lancamento: LancamentoFinaceiros, usuarioId: string): Promise<LancamentoFinaceiros> {
        const resultado = this.repo.NovoPorUsuario(lancamento, usuarioId)

        return resultado
    }

    async excluir(idLancamento: string, usuarioId: string): Promise<void>{
        const consultaLancamento = await this.repo.lancamentoExistePorUsuario(idLancamento, usuarioId)
        if (!consultaLancamento){
            throw new Error('404')
        }
        return this.repo.excluirPorUsuario(idLancamento, usuarioId)

    }

    async alterar(lancamentoFinanceiro: LancamentoFinaceiros, usuarioId: string) {
        // const resultadoLancamentoFinanceiro = await this.repo.lancamentoExistePorUsuario(lancamentoFinanceiro.id, usuarioId)
        // if (!resultadoLancamentoFinanceiro) {
        //     throw new Error('404')
        // }
        return this.repo.alterarPorUsuario(lancamentoFinanceiro, usuarioId)
    }

    

    async ObterTodos(): Promise<any> {

        return await this.repo.obterTodos()

    }
   
    async ObterPorIdLancamentoFinanceiro(id: any): Promise<any> {

        return await this.repo.obterPorId(id)
    }

  
}
