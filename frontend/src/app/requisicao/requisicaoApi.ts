export default class RequisicaoApi {
    
    static headers: Record<string, string> = {
        "Content-Type": "application/json",
        "ContentType": "meu-ContentType"

    }
    static urlBase = `https://appfinanceiro.onrender.com`

    static adicionaToken(token: string) {
        RequisicaoApi.headers = { ...RequisicaoApi.headers, Authorization: `Bearer ${token}`}
        return
    }

    static apagaToken() {
        delete RequisicaoApi.headers.Authorization
        return
    }

    static async requisicaoGenerica(metodo: string, endPoint: string, dadosBody?: any) {
        const response = await fetch(RequisicaoApi.urlBase + endPoint, {
            headers: RequisicaoApi.headers,
            method: metodo,
            body: dadosBody  ? JSON.stringify(dadosBody) : null,
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

    static async httpGet(endPoint: string) {
        const resultado = await RequisicaoApi.requisicaoGenerica("GET", endPoint)
        return resultado
    }

    static async httpPost(endPoint: string, dadosBody: any) {
        const resultado = await RequisicaoApi.requisicaoGenerica("POST", endPoint, dadosBody);
        return resultado
    }

    static async httpPut(endPoint: string, dadosBody: any) {
        const resultado = await RequisicaoApi.requisicaoGenerica("PUT", endPoint, dadosBody);
        return resultado
    }

    static async httpDelete(endPoint: string) {
        const resultado = RequisicaoApi.requisicaoGenerica("DELETE", endPoint);
        return resultado
    }
}

