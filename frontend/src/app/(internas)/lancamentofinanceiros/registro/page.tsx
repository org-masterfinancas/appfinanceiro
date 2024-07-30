import LancamentoFinanceiroAdicionar from "../../../components/LancamentoFinanceiroAdicionar";
import BotaoLink from "@/app/components/BotaoLink";

export default function Page() {
    return (
        <main className='flex flex-col'>
            <div className="">
                <BotaoLink rotulo="< Voltar" link="/lancamentofinanceiros/"/>
            </div>
            <LancamentoFinanceiroAdicionar />
        </main>
    )
}
