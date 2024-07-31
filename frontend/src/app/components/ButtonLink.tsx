import Link from "next/link"

interface ButtonLinkPropos {
    rotulo: string
    link: string
}

export default function ButtonLink(props: ButtonLinkPropos) {
    return (
        <button className="bg-orange-500 rounded-xl p-2 text-white ">
            <Link href={props.link}>
                {props.rotulo}
            </Link>
        </button>
    )
}