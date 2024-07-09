import app from './app';

const porta = process.env.PORT ?? 7000

app.listen(porta, () =>{
  console.log(`API rodando na porta: ${porta}`)
})
