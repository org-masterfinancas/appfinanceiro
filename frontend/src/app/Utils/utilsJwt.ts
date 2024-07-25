import jwt from 'jsonwebtoken'

export default function decodificarJwt(token: string){
        
    const tokenDecodificado: any = jwt.decode(token)
    const email = tokenDecodificado?.email
    return email
}