'use client'
import useApi from "../hooks/useApi"
import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro"
import BotaoLink from "../../components/BotaoLink"
import LancamentoFinanceiroTabela from "../../components/LancamentoFinanceiroTabela"
import { useEffect, useState } from "react"


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
        <div className="flex  flex-col gap-10">
            <div className="flex justify-between">
                <div className="">
                    <div>Minhas Finanças</div>
                    <div className="text-xs">Você possui ... registro </div>
                </div>
                <div className="">
                    <div>Filtro</div>
                    <BotaoLink rotulo="+ Novo Lancamento" link="/lancamentofinanceiros/registro" />
                </div>
            </div>
            <LancamentoFinanceiroTabela lancamentos={lancamentos} />
        </div>
    )
}