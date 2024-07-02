import bcrypt from 'bcrypt'

export default class Senha {
    static criptografar(senha: string) {
        const senhaCriptografada = bcrypt.hashSync(senha, 5)
        return senhaCriptografada
    }

    static comparar(senha: string, senhaCriptografada: string){
        const senhaIguais = bcrypt.compareSync(senha, senhaCriptografada)
        return senhaIguais
    }
}
