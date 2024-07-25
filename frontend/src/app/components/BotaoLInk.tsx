import Link from "next/link"

interface BotaoLinkPropos {
    rotulo: string
    link: string
}

export default function BotaoLink(props: BotaoLinkPropos) {
    return (
        <button className="bg-orange-500 rounded-md p-1 m-2">
            <Link href={props.link}>
                {props.rotulo}
            </Link>
        </button>
    )
}