import { NextRequest } from "next/server"

export const dados = {
    sessaoValida: false
}

export interface RequestPersonalizado extends NextRequest {
    sessaoValidada: boolean
  }
  