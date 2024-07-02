import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'; 
import cors from 'cors'
import autenticacao from './middleware/MiddlewareAutenticacao'
import rotasLancamentoFinanceiros from './router/RouterV2LancamentoFinaceiros'
import rotasV1LancamentoFinanceiros from './router/RouterV1LancamentoFinaceiros'
import rotasLogin from './router/Routerlogin'
import rotasUsuarios from './router/RouterUsuarios'


const app = express()

const porta = process.env.PORT ?? 7000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.use('/v1/lancamentoFinanceiros', rotasV1LancamentoFinanceiros)
app.use('/v2/lancamentoFinanceiros', autenticacao, rotasLancamentoFinanceiros)
app.use('/usuarios', rotasUsuarios)
app.use('/login', rotasLogin)




app.use((err: Error, req: Request, res:Response, next:NextFunction) => {
  console.error('Erro capturado pelo middleware:', err);
  res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
});


app.listen(porta, () =>{
  console.log(`API rodadando na porta: ${porta}`)}
)