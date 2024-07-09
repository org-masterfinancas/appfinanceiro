import { Router } from "express";
import ServiceLogin from "../service/ServiceLogin";
import ServiceValidador from "../service/ServiceValidador";

const router = Router()
const service = new ServiceLogin()

router.post('/', async (req, res) => {
    let { email, senha } = req.body
    email = ServiceValidador.emailBemFormatado(email);
    senha = ServiceValidador.senhaBemFormatada(senha);

    const resultado = await service.entrar(email, senha)
    const token = resultado.token

    if (resultado.sucesso) {
        res.status(200).json({ token })
    } else {
        res.status(401).json({ error: resultado.mensagem })
    }

})

router.use(async (req: any, res: any) => {
    res.status(400).json({ error: 'Rota ou Método não tratados' });
});

export default router
