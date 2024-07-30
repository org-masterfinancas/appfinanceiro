'use client'
import { ContextoUsuario } from "@/app/data/contexts/ContextoUsuario"
import { useContext, useEffect, useState } from "react"
import useApi from "../hooks/useApi"
import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro"
import Link from "next/link"
import { formatDate } from "@/app/Utils/utilsdata"
import BotaoLink from "@/app/components/BotaoLink"
import TabelaLancamentoFinanceiros from "@/app/components/TabelaLancamentoFinanceiros"


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
            <div className="flex justify-between"> {/* Cabeçalho Lancamento Financeiro */}
                <div className="">
                    <div>Minhas Finanças</div>
                    <div className="text-xs">Você possui ... registro </div>
                </div>
                <div className="">
                    <div>Filtro</div>
                    <BotaoLink rotulo="+ Novo Lancamento" link="/lancamentofinanceiros/registro" />
                </div>
            </div>
            <TabelaLancamentoFinanceiros lancamentos={lancamentos} />
        </div>
    )
}