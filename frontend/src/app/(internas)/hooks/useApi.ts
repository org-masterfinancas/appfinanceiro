import { useContext, useEffect, useState } from 'react';
import {ContextoToken} from '@/app/data/contexts/ContextoToken';
import RequisicaoApi from '@/app/requisicao/requisicaoApi';

function useApi() {
    
    const requisicaoApi = RequisicaoApi
    const { jwt } = useContext(ContextoToken)

    useEffect(() => {
        if (jwt) {
            requisicaoApi.adicionaToken(jwt);
        } else {
            requisicaoApi.apagaToken();
        }
    }, [jwt]);

   
    return {
        exibirHeaders: requisicaoApi.exibirHeaders,
        getApi: requisicaoApi.httpGet,
        postApi: requisicaoApi.httpPost,
        putApi: requisicaoApi.httpPut,
        delApi: requisicaoApi.httpDelete
    };
}

export default useApi
