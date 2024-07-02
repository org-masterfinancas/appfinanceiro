import jwt from 'jsonwebtoken'

export default function verificaToken(req: any, res: any, next: any) {
    const segredo = process.env.ACCESS_TOKEN_SECRET ?? ''
    const headerAuthon = req.headers['authorization']
    const token = headerAuthon?.split(' ')[1]

    if (!token) {
        res.status(401).send()
    }

    jwt.verify(token, segredo as 'Secret', (err: any, dados: any) => {
        if (err) {
            res.status(403).send()
        } else {
            req.usuarioId = dados.id
            next()
        }
    })
}
