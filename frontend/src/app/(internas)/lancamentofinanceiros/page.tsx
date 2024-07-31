'use client'
import useApi from "../hooks/useApi"
import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro"
import BotaoLink from "../../components/BotaoLink"
import LancamentoFinanceiroTabela from "../../components/LancamentoFinanceiroTabela"
import { useEffect, useState, useContext } from "react"
import LancamentoFinanceiroFiltro from "@/app/components/LancamentoFinanceiroFiltro"
import { ContextoUsuario } from "../../data/contexts/ContextoUsuario"


export default function LancamentoPage() {
    const { getApi } = useApi()
    const [carregando, setCarregando] = useState<boolean>(true);
    const { usuario } = useContext(ContextoUsuario)
    const [lancamentos, setLancamentos] = useState<LancamentoFinanceiro[]>([]);
    const [filtroStatus, setFiltroStatus] = useState<string>("Todos")

    const nome = usuario.split('@')[0];
    const nomeFormatado = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();

    useEffect(() => {
        async function obterLancamentos() {
            const dados = await getApi('/lancamentofinanceiros/')
            setLancamentos(dados);
            setCarregando(false);
        }
        obterLancamentos();
    }, [])

 
      if (carregando) return <div>...</div>

    const lancamentosFiltrados = filtroStatus === "Todos"
        ? lancamentos
        : lancamentos.filter(lancamento => lancamento.statusLancamento === filtroStatus);


    return (
        <div className="flex  flex-col gap-10">
            <div className="flex justify-between">
                <div className="">
                    <div>Minhas Finanças</div>
                    <div className="text-xs">Você possui {lancamentosFiltrados.length || 0} registro(s) </div>
                </div>
                <div className="flex gap-4">
                    <LancamentoFinanceiroFiltro
                        labelTexto="Filtro por Status"
                        valor={filtroStatus}
                        valorMudou={setFiltroStatus}
                    />
                    <BotaoLink rotulo="+ Novo Lançamento" link="/lancamentofinanceiros/registro" />
                </div>
            </div>
            {lancamentos.length ?
                <LancamentoFinanceiroTabela lancamentos={lancamentosFiltrados} />
                :
                <span className="flex content-center flex-col items-center
                 bg-orange-400 text-2xl text-white rounded-full m-10 p-10">
                  Olá {nomeFormatado}, você não possui lançamento cadastrado!</span>
            }
        </div>
    )
}