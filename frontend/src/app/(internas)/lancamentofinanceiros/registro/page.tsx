import { AdicionarForm } from "@/app/components/adicionarForm";
import AdicionarLancamentoFinanceiro from "@/app/components/AdicionarLancamentoFinanceiro";
import BotaoLink from "@/app/components/BotaoLink";

export default function Page() {
    return (
        <main className='flex flex-col'>
            <div className="">
                <BotaoLink rotulo="< Voltar" link="/lancamentofinanceiros/"/>
            </div>
            <AdicionarLancamentoFinanceiro />
        </main>
    )
}
