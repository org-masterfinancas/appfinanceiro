'use client'
import { ContextoUsuario } from "@/app/data/contexts/ContextoUsuario"
import { useContext, useEffect, useState } from "react"
import useApi from "../hooks/useApi"
import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro"
import Link from "next/link"
import { formatDate } from "@/app/Utils/utilsdata"
import BotaoLink from "@/app/components/BotaoLInk"


export default function LancamentoPage() {
    const { getApi } = useApi()
    const [lancamentos, setLancamentos] = useState<LancamentoFinanceiro[]>([]);

    useEffect(() => {
        async function obterLancamentos() {
            const dados = await getApi('/lancamentofinanceiros/')
            setLancamentos(dados);
        }
        obterLancamentos();
    }, [])


    return (
        <main className="flex  flex-col items-center p-10">
            <div className="p-10">
                <span>Lançamentos</span>
            </div>
            <div className="flex flex-col p-10">
                <BotaoLink rotulo="Novo Lancamento"link="/lancamentofinanceiros/registro"/>
                <BotaoLink rotulo="Lab" link="/lab"/>
            </div>
            <ul>
                {lancamentos?.map((lancamento: LancamentoFinanceiro) => (
                    <li className='font-bold' key={lancamento.id}>
                        Id: #{lancamento.id?.split('-')[0]} |
                        Descrição:  {lancamento.descricaoLancamento} |
                        Status:   {lancamento.statusLancamento} |
                        Data Registro:  {formatDate(lancamento.dataCriacaoLancamento)} |
                        Tipo:   {lancamento.tipoLancamento} |
                        valor:  {lancamento.valorLancamento} |
                        Nome:   {lancamento.usuario?.nome} |
                        <BotaoLink
                            rotulo="Editar"
                            link={`/lancamentofinanceiros/registro/${lancamento.id}`}>
                        </BotaoLink>
                    </li>
                ))}
            </ul>
        </main>
    )
}