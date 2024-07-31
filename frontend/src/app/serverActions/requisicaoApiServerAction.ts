'use server'

const headers: Record<string, string> = {
    "Content-Type": "application/json",
}

const urlBase = `https://appfinanceiro.onrender.com`

export async function adicionaToken(token: string) {
    headers.Authorization = `Bearer ${token}`
}

export async function apagaToken() {
    delete headers.Authorization
}

export async function exibirHeaders() {
    return headers
}

async function requisicaoGenerica(metodo: string, endPoint: string, dadosBody?: any) {
    const response = await fetch(urlBase + endPoint, {
        headers,
        method: metodo,
        body: dadosBody ? JSON.stringify(dadosBody) : null,
        cache: 'no-cache',
    });

    try {
        const resultado = await response.json();
        return resultado;
    } catch (error) {
        console.error("Erro ao processar resposta JSON:", error);
        return null;
    }
}

export async function httpGet(endPoint: string) {
    return await requisicaoGenerica("GET", endPoint);
}

export async function httpPost(endPoint: string, dadosBody: any) {
    return await requisicaoGenerica("POST", endPoint, dadosBody);
}

export async function httpPut(endPoint: string, dadosBody: any) {
    return await requisicaoGenerica("PUT", endPoint, dadosBody);
}

export async function httpDelete(endPoint: string) {
    return await requisicaoGenerica("DELETE", endPoint);
}
