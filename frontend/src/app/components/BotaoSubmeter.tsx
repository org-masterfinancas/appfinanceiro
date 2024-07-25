'use client'

import { useFormStatus } from "react-dom"

interface propsBotaoSubmeter {
    titulo?: string
}

export default function BotaoSubmeter(props: propsBotaoSubmeter){
    const { pending  } = useFormStatus()

    return(
        <button type="submit" disabled={pending}  className='bg-orange-400 px-4 py-2 rounded-md text-white'>
            {props.titulo}
        </button>
    )
}