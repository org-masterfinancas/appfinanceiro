'use client'
import useApi from "../hooks/useApi"
import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro"
import { useEffect, useState, useContext } from "react"
import LancamentoFinanceiroFiltro from "@/app/components/Mantine/Lancamento/LancamentoFinanceiroFiltro"
import { ContextoUsuario } from "../../data/contexts/ContextoUsuario"
import Link from "next/link"
import { Box, Button, Container, Group, Select, Stack, Text, Paper } from "@mantine/core"
import LancamentoFinanceiroTabela from "@/app/components/Mantine/Lancamento/LancamentoFinanceiroTabela/LancamentoFinanceiroTabela"



export default function LancamentoPage() {
    const { getApi } = useApi()
    const [carregando, setCarregando] = useState<boolean>(true);
    const { usuario } = useContext(ContextoUsuario)
    const [lancamentos, setLancamentos] = useState<LancamentoFinanceiro[]>([]);
    const [filtroStatus, setFiltroStatus] = useState<string>("Todos")

    useEffect(() => {
        async function obterLancamentos() {
            const dados = await getApi('/lancamentofinanceiros/')
            setLancamentos(dados);
            setCarregando(false);
        }
        obterLancamentos();
    }, [])


    if (carregando) return <div>...</div>

    const lancamentosFiltrados = filtroStatus === "Todos"
        ? lancamentos
        : lancamentos.filter(lancamento => lancamento.statusLancamento === filtroStatus);


    return (
        <Container size={"xl"}>
            <Group justify="space-between" >
                <Paper radius="md" withBorder p="xs">
                    <Text>Minhas Finanças</Text>
                    <Text>Você possui {lancamentosFiltrados.length || 0} registro(s) </Text>
                </Paper>
                <Group >
                    <LancamentoFinanceiroFiltro
                        labelTexto="Filtro por Status"
                        valor={filtroStatus}
                        valorMudou={setFiltroStatus}

                    />
                    <Button component={Link} href="/lancamentofinanceiros/registro"> + Novo Lançamento</Button>
                </Group>
            </Group>
            {lancamentos.length ?
                <LancamentoFinanceiroTabela lancamentos={lancamentosFiltrados} />
                :
                <Container size={"xs"}>
                    <Text p={"xl"}>
                        Olá {usuario.nome}, você não possui lançamento cadastrado!
                    </Text>
                </Container>
            }
        </Container>
    )
}