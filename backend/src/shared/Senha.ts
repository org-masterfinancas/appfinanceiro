import bcrypt from 'bcrypt'

export default class Senha {
     static async criptografar(senha: string) {
        const senhaCriptografada = bcrypt.hash(senha, 5)
        return senhaCriptografada
    }

    static async comparar(senha: string, senhaCriptografada: string){
        const senhaIguais = bcrypt.compare(senha, senhaCriptografada)
        return senhaIguais
    }
}
