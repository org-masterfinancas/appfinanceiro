import { LancamentoFinanceiro } from "../data/model/lancamentoFinanceiro"
import Real from "../Utils/Real"
import { formatDate } from "../Utils/utilsdata"
import ButtonLink from "@/app/components/ButtonLink"

interface LancamentoFinanceiroTabelaProps {
    lancamentos?: LancamentoFinanceiro[]
}

export default function LancamentoFinanceiroTabela(props: LancamentoFinanceiroTabelaProps) {
    const lancamentos = props.lancamentos

    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Id</th>
                <th className="text-left p-4">Descrição</th>
                <th className="text-left p-4">Valor</th>
                <th className="text-left p-4">Tipo</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Data</th>
                <th className="text-left p-4">Usuário</th>
                <th className="text-left p-4"></th>
            </tr>
        )
    }

    function renderizarDados() {
        return lancamentos?.map((lancamento, i) => {
            return (
                <tr key={lancamento.id} className={`${i % 2 === 0 ? 'bg-orange-200' : 'bg-orange-100'}`}>
                    <td className="text-left p-4">{lancamento.id?.split('-')[0]}</td>
                    <td className="text-left p-4">{lancamento.descricaoLancamento}</td>
                    <td className="text-left p-4">{Real.format(lancamento.valorLancamento)}</td>
                    <td className="text-left p-4">{lancamento.tipoLancamento}</td>
                    <td className="text-left p-4">{lancamento.statusLancamento}</td>
                    <td className="text-left p-4">{formatDate(lancamento.dataCriacaoLancamento)}</td>
                    <td className="text-left p-4">{lancamento.usuario?.nome}</td>
                    {renderizarAcoes(lancamento.id)}
                </tr>
            )
        })
    }

    function renderizarAcoes(id?: string) {
        return (
            <td>
                <ButtonLink rotulo="Editar"link={`/lancamentofinanceiros/registro/${id}`}/>
            </td>
        )
    }

    return (
        <table className="">
            <thead className={` text-gray-100 bg-gradient-to-r from-orange-400 to-orange-600`}>
                {renderizarCabecalho()}
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>
        </table>
    )
}
