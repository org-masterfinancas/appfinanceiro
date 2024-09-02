import RequisicaoApi from '@/app/requisicao/requisicao-api';

export default function useApi() {
    return {
        exibirHeaders: RequisicaoApi.headers,
        getApi: RequisicaoApi.httpGet,
        postApi: RequisicaoApi.httpPost,
        putApi: RequisicaoApi.httpPut,
        delApi: RequisicaoApi.httpDelete
    };
}
