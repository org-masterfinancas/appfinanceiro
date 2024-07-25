
import Cabecalho from "./Cabecalho";

export default function Pagina(props: any) {
    return (
        <div className="flex flex-col">
            <Cabecalho />
            <main className="p-8">{props.children}</main>
        </div>
    )
}