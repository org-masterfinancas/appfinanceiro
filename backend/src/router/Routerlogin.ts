import { Router } from "express";
import ServiceLogin from "../service/ServiceLogin";

const router = Router()
const service = new ServiceLogin()

router.post('/', async (req, res) => {
    const { email, senha } = req.body
    const resultado = await service.entrar(email, senha)
    const token = resultado.token

    if (resultado.sucesso) {
        res.status(200).json({ token })
    } else {
        res.status(204).send(resultado.mensagem)
    }

})

export default router