interface ProposEntradaFormulario {
    tipo?: "text" | "number" | "hidden";
    labelTexto: string;
    valor?: any;
    nome?: string;
    somenteLeitura?: boolean;
    className?: string;
    requerido?: boolean
    valorMudou?: (valor: any) => void;
}

export default function EntradaFormulario(props: ProposEntradaFormulario) {
    return (
        <div className={`flex flex-col ${props.className}`}>
            <label htmlFor={props.nome}>{props.labelTexto}</label>
            <input
                type={props.tipo ?? "text"}
                id={props.nome}
                name={props.nome}
                readOnly={props.somenteLeitura}
                // value={props.valor}
                defaultValue={props?.valor}
                required
                onChange={(e) => props.valorMudou?.(e.target.value)}
                className={`
                    border border-orange-600 rounded-lg
                    focus:outline-none bg-gray-100 px-4 py-2
                    ${props.somenteLeitura ? "" : "focus:bg-white"}
                `}
            />
        </div>
    );
}

/*
interface ProposEntradaFormulario {
    tipo?: "text" | "number" | "hidden"
    labelTexto: string
    valor: any
    nome?: string
    somenteLeitura?: boolean
    className?: string
    valorMudou?: (valor: any) => void
}

export default function EntradaFormulario(props: ProposEntradaFormulario) {
    return (
        <div className={`flex flex-col ${props.className}`}>
            <label htmlFor="">{props.labelTexto}</label>
            <input
                type="text"
                id={props.nome}
                name={props.nome}
                readOnly={props.somenteLeitura}
                value={props.valor}
                onChange={(e) => props.valorMudou?.(e.target.value)}
                className={`
                    border border-orange-600 rounded-lg
                    focus:outline-none bg-gray-100 px-4 py-2
                    ${props.somenteLeitura ? "" : "focus:bg-white"}
                `}
            />
        </div>
    )
}

*/