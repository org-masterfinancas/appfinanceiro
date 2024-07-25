'use client'
import { createContext, useState } from "react"

const ContextoToken = createContext<any>({})
export { ContextoToken }

export default function ProvedorToken(props: any) {
    const [ jwt, setJwt] = useState('')

    return (
        <ContextoToken.Provider
            value={{
                jwt,
                setJwt,
            }}>
            {props.children}
        </ContextoToken.Provider>
    )
}