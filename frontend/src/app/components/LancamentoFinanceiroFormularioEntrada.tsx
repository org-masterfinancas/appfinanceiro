interface LancamentoFinanceiroFormularioEntradaProps {
    tipo?: "text" | "number" | "hidden"| "date"
    labelTexto: string;
    place?: string
    valor?: any;
    nome?: string;
    somenteLeitura?: boolean;
    className?: string;
    requerido?: boolean
    valorMudou?: (valor: any) => void;
    opcoes?: { valor: string; label: string }[];
}

export default function LancamentoFinanceiroFormularioEntrada(props: LancamentoFinanceiroFormularioEntradaProps) {
    return (
        <div className={`flex flex-col ${props.className}`}>
            <label htmlFor={props.nome} className="mb-2" >{props.labelTexto}</label>
            <input
                type={props.tipo ?? "text"}
                id={props.nome}
                name={props.nome}
                readOnly={props.somenteLeitura}
                defaultValue={props.valor}
                required
                onChange={(e) => props.valorMudou?.(e.target.value)}
                step="any"
                placeholder={props.place}
                className={`
                    border border-orange-600 rounded-lg
                    focus:outline-none bg-gray-100 px-4 py-2
                    ${props.somenteLeitura ? "" : "focus:bg-white"}
                `}
            />
        </div>
    )
}
