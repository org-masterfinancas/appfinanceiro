import { LinhasLancamentos } from "@/app/(internas)/alerta/shared/interface";

export function ordenarDados(
    dados: LinhasLancamentos[],
    conteudo: { ordenarPor: keyof LinhasLancamentos; invertido: boolean }
) {
    const { ordenarPor } = conteudo;

    if (!ordenarPor) return dados;

    return [...dados].sort((a, b) => {
        let compararResultado = 0;

        if (typeof a[ordenarPor] === 'string' && typeof b[ordenarPor] === 'string') {
            compararResultado = a[ordenarPor].localeCompare(b[ordenarPor]);
        } else if (typeof a[ordenarPor] === 'number' && typeof b[ordenarPor] === 'number') {
            compararResultado = a[ordenarPor] - b[ordenarPor];
        } else if (a[ordenarPor] instanceof Date && b[ordenarPor] instanceof Date) {
            compararResultado = (a[ordenarPor] as Date).getTime() - (b[ordenarPor] as Date).getTime();
        }

        return conteudo.invertido ? -compararResultado : compararResultado;
    });
}