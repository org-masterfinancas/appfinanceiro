import { PrismaClient } from "@prisma/client";

let _Connection: PrismaClient | null = null;

export default class ConexaoBD {
    public static getConnection() {
        if (!_Connection) {
            try {
                _Connection = new PrismaClient()
                console.log(`Conectado ao banco com sucesso`);
            } catch (err) {
                console.log(`Erro ao conectar com o banco: `, err);
                process.exit(1);
            }
        }
        return _Connection;
    }

    public static clearConnection() {
        if (_Connection) {
            try {
                console.log(`Encerrando a conexão com o banco`);
                _Connection.$disconnect()
            } catch (err) {
                console.log(`Erro ao encerrar a conexao com o banco: `, err);
                process.exit(1);
            }
        }
        _Connection = null;
    }

}
