import jwt from 'jsonwebtoken'

export default function decodificarJwt(token: string) {

    const tokenDecodificado: any = jwt.decode(token)
    
    const { id, nome, sobrenome, email, avatar, perfil } = tokenDecodificado;
    
    const usuario = { id, nome, sobrenome, email, avatar, perfil };
    
    return usuario
}
//const email = tokenDecodificado?.email