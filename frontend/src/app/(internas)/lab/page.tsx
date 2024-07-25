'use client'
import RequisicaoApi from "@/app/requisicao/requisicaoApi"
import useLocalStorage from "../hooks/useCookies"
import Cookies from 'js-cookie';
import Link from "next/link";
import BotaoLink from "@/app/components/BotaoLInk";


export default function () {
    const requisicaoApi = RequisicaoApi
    const meusHeaders = requisicaoApi.headers

    const cookieToken = Cookies.get('token');
    const token2 = cookieToken || null

    return (
        <div className="flex flex-col">
            <div>
                <BotaoLink rotulo="Início" link="/lancamentofinanceiros/" />
            </div>
            <h1 className="bg-amber-500">Acessando a requisição (Classe Statica) diretamente</h1>
            <span>{meusHeaders?.Authorization}</span>
            <span>{meusHeaders?.ContentType}</span>
            <span>-------------------------------------------------</span>
            <h1 className="bg-purple-500">Acessando Cookies via js-cookies</h1>
            <span>{token2}</span>
        </div>
    )
}
