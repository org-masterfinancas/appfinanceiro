export default class RequisicaoApi {


    static headers: Record<string, string> = {
        "Content-Type": "application/json",

    }
    static urlBase = process.env.NEXT_PUBLIC_URL_BACKEND

    static adicionaToken(token: string) {
        RequisicaoApi.headers = { ...RequisicaoApi.headers, Authorization: `Bearer ${token}` }
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
            body: dadosBody ? JSON.stringify(dadosBody) : null,
            cache: 'no-cache',
        })

        console.log("aviso...")
        console.log(response)

        let bodyResponse = ''
        try {
            const bodyResponse = await response.json();
            return bodyResponse;
        } catch (e) {
            return bodyResponse
        }

            // if (!response.ok){
            //     const dadosDeErro = await response.json()
            //     return {error: dadosDeErro || 'Erro na requisção'}
            // }
            // let body = ''
            // body = await response.text()
            // return JSON.parse(body)

            //   }catch (e){
            //     return { error: 'Erro na comunicação com  o servidor...'}
            //   }
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

