import { useContext, useEffect, useState } from 'react';
import RequisicaoApi from '@/app/requisicao/requisicaoApi';

export default function useApi() {
    return {
        exibirHeaders: RequisicaoApi.headers,
        getApi: RequisicaoApi.httpGet,
        postApi: RequisicaoApi.httpPost,
        putApi: RequisicaoApi.httpPut,
        delApi: RequisicaoApi.httpDelete
    };
}
