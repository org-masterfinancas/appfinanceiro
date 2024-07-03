import { NextFunction, Request, Response, Router } from "express";
import ServiceLancementoFinanceiros from '../service/ServiceLancamentoFinanceiros'
import { ServiceUsuario } from "../service/ServiceUsuario";
import LancamentoFinanceiro from "../model/LancamentoFinanceiro";

const router = Router()
const service = new ServiceLancementoFinanceiros()
const serviceUsuario = new ServiceUsuario()

const ObterIdPorEmail = async (req: Request, res: Response, next: NextFunction) => {
    const email = 'dev@financeiro.io'
    try {
        const usuarioId = await serviceUsuario.ObterIdPorEmail(email)
        req.usuarioId = usuarioId
        next()

    } catch (error) {
        console.error('RouterV1LancamentoFinanceiro - Erro ao retorna o Usuário Dev', error)
        next(error)
    }
}

router.use(ObterIdPorEmail)

// todos os lancaçamentos
router.get('/todos', async (req:Request, res: Response) => {
    const todosLancamentos = await service.ObterTodos()
    res.status(200).send(todosLancamentos)

})

router.get('/todos/:id', async (req:Request, res:Response) => {
    const { id } = req.params
    const lancamento = await service.ObterPorIdLancamentoFinanceiro(id)
    if (lancamento) {
        res.status(200).send(lancamento)
        return
    }
    res.sendStatus(404)
})


//todos de um usuário
router.get('/', async (req: Request, res: Response) => {
    const usuarioId = req.usuarioId
    const todosLancamentosDeUmUsuario = await service.ObterTodosDeUmUsuario(usuarioId)
    res.status(200).send(todosLancamentosDeUmUsuario)

})
//novo de um usuário
router.post('/', async (req:Request, res:Response) => {

    const { descricaoLancamento, valorLancamento, statusLancamento, tipoLancamento, dataCriacaoLancamento } = req.body.lancamentofinanceiro
    const lancamentoNovo = new LancamentoFinanceiro(descricaoLancamento, valorLancamento, tipoLancamento, statusLancamento, dataCriacaoLancamento)

    const usuarioId = req.usuarioId

    const resultado = await service.Novo(lancamentoNovo, usuarioId)
    res.sendStatus(201)
})

//alterar de um usuário
router.put('/:id', async (req: Request, res: Response) => {
    const idParams = req.params.id
    const { descricaoLancamento, valorLancamento, statusLancamento, tipoLancamento, dataCriacaoLancamento } = req.body.lancamentofinanceiro

    const lancamento = new LancamentoFinanceiro(descricaoLancamento, valorLancamento, tipoLancamento, statusLancamento, dataCriacaoLancamento, idParams)
    const usuarioId = req.usuarioId

    const lancamentoAlterado =  await service.alterar(lancamento, usuarioId)
    return res.status(200).send(lancamentoAlterado)
})

//excluir de um usuário
router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const usuarioId = req.usuarioId

    const lancamentoExcluido = await service.excluir(id, usuarioId)

    return res.status(200).send(lancamentoExcluido)
})



//obter um Por Usuário
router.get('/:id', async (req:Request, res:Response) => {
    const { id } = req.params
    const usuarioId = req.usuarioId

    const lancamento = await service.ObterUmPorUsuario(id, usuarioId)
    if (lancamento) {
        res.status(200).send(lancamento)
        return
    }
    res.sendStatus(404)
})


export default router



