import { NextFunction, Request, Response, Router } from "express";
import ServiceLancementoFinanceiros from '../service/ServiceLancamentoFinanceiros'
import { ServiceUsuario } from "../service/ServiceUsuario";
import LancamentoFinanceiro from "../model/LancamentoFinanceiro";
import { ok } from "assert";

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


//todos de um usuário
router.get('/', async (req, res) => {
    
    const usuarioId = req.usuarioId
    const todosLancamentosDeUmUsuario = await service.ObterTodosDeUmUsuario(usuarioId)
    res.status(200).send(todosLancamentosDeUmUsuario)

})
//novo de um usuário
router.post('/novo', async (req, res) => {

    const { descricaoLancamento, valorLancamento, statusLancamento, tipoLancamento, dataCriacaoLancamento } = req.body.lancamentofinanceiro
    const lancamentoNovo = new LancamentoFinanceiro(descricaoLancamento, valorLancamento, tipoLancamento, statusLancamento, dataCriacaoLancamento)
    
    const usuarioId = req.usuarioId 
    
    const resultado = await service.Novo(lancamentoNovo, usuarioId)
    res.status(200).send(resultado)
})


//excluir de um usuário
router.delete('/excluir/:id', async (req: Request, res: Response) =>{
    const id = req.params.id
    const usuarioId = req.usuarioId 
    
    await service.excluir(id, usuarioId)
    
    return res.status(200).end()
})

//alterar de um usuário
router.put('/alterar', async (req: Request, res: Response) =>{
    
    const {id, descricaoLancamento, valorLancamento, statusLancamento, tipoLancamento, dataCriacaoLancamento } = req.body.lancamentofinanceiro
    const lancamento = new LancamentoFinanceiro(descricaoLancamento, valorLancamento, tipoLancamento, statusLancamento, dataCriacaoLancamento, id)
    const usuarioId = req.usuarioId 
    
    await service.alterar(lancamento, usuarioId)
    return res.status(201).end()
})

//obter um Por Usuário
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const usuarioId = req.usuarioId 

    const lancamento = await service.ObterUmPorUsuario(id, usuarioId)

    res.status(200).send(lancamento)
})





router.get('/todos', async (req, res) => {

    const todosLancamentos = await service.ObterTodos()
    res.status(200).send(todosLancamentos)

})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const lancamentoAlterar = await service.ObterPorIdLancamentoFinanceiro(id)

    res.status(200).send(lancamentoAlterar)
})



export default router



