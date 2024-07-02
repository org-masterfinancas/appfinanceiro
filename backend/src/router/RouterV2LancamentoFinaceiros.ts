import { Request, Response, Router } from "express";
import ServiceLancementoFinanceiros from '../service/ServiceLancamentoFinanceiros'
import LancamentoFinanceiro from "../model/LancamentoFinanceiro";

// interface RequestAuth extends Request {
//     usuarioId?: string
// }

const router = Router()
const service = new ServiceLancementoFinanceiros()

//todos de um usuário
router.get('/', async (req:Request, res) => {

    const usuarioId = req.usuarioId
    const todosLancamentos = await service.ObterTodosDeUmUsuario(usuarioId)
    res.status(200).send(todosLancamentos)

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

export default router



