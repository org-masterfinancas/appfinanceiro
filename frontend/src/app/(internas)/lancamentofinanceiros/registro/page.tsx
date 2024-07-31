import LancamentoFinanceiroAdicionar from "../../../components/LancamentoFinanceiroAdicionar";
import ButtonLink from "@/app/components/ButtonLink";

export default function Page() {
    return (
        <main className='flex flex-col'>
            <div className="">
                <ButtonLink rotulo="< Voltar" link="/lancamentofinanceiros/"/>
            </div>
            <LancamentoFinanceiroAdicionar />
        </main>
    )
}
