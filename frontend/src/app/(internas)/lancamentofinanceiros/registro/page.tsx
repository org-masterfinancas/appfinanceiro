import { AdicionarForm } from "@/app/components/adicionarForm";
import BotaoLink from "@/app/components/BotaoLInk";
import Link from "next/link";

export default function Page() {
    return (
        <main className='flex min-h-screen flex-col items-center p-24'>
            <div className="p-10">
                <BotaoLink rotulo="Início" link="/lancamentofinanceiros/"/>
            </div>
            <AdicionarForm />
        </main>
    )
}