'use client'
import Tabela from "@/app/components/mantine/lancamento-financeiro/tabela/Tabela"
import Filtro from "@/app/components/mantine/lancamento-financeiro/Filtro"

import useApi from "../hooks/useApi"
import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro"
import { useEffect, useState, useContext } from "react"
import { ContextoUsuario } from "../../data/contexts/ContextoUsuario"
import Link from "next/link"
import { Button, Container, Group, Text, Paper, Pagination, TextInput, rem, Loader } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import CabecalhoPagina from "@/app/components/mantine/cabecalho-pagina/CabecalhoPagina"

function aplicarPesquisa(dados: LancamentoFinanceiro[], procurar: string) {

    const consulta = procurar.toLowerCase().trim()

    return dados.filter((item) => {
        return (
            item.descricaoLancamento.toLowerCase().includes(consulta) ||
            item.tipoLancamento.toLowerCase().includes(consulta) ||
            item.usuario.nome.toLowerCase().includes(consulta) ||
            item.valorLancamento.toString().toLowerCase().includes(consulta)
        )
    })
}

export default function LancamentoPage() {
    const { getApi } = useApi()
    const [carregando, setCarregando] = useState<boolean>(true);
    const { usuario } = useContext(ContextoUsuario)
    const [lancamentos, setLancamentos] = useState<LancamentoFinanceiro[]>([]);
    const [filtroStatus, setFiltroStatus] = useState<string>("Todos")
    const [paginaAtiva, setPaginaAtiva] = useState<number>(1)
    const [procurar, setProcurar] = useState('')
    const itensPorPagina = 5

    useEffect(() => {
        async function obterLancamentos() {
            const dados = await getApi('/lancamentofinanceiros/')
            setLancamentos(dados);
            setCarregando(false);
        }
        obterLancamentos();
    }, [])

    useEffect(() => {
        setPaginaAtiva(1);
    }, [filtroStatus, procurar]);

    if (carregando) return <Loader color="yellow" type="bars" />

    const lancamentosFiltrados = filtroStatus === "Todos" || filtroStatus == null
        ? lancamentos
        : lancamentos.filter(lancamento => lancamento.statusLancamento === filtroStatus);


    const lancamentosPesquisa = aplicarPesquisa(lancamentosFiltrados, procurar);

    const indiceInicio = (paginaAtiva - 1) * itensPorPagina;
    const indiceFim = indiceInicio + itensPorPagina;
    const itensAtuais = lancamentosPesquisa.slice(indiceInicio, indiceFim);


    return (
        <>
            <CabecalhoPagina/>
            <Container size={"xl"}>
                <Group justify="space-between">
                    <Paper radius="md" withBorder p="xs">
                        <Text>Minhas Finanças</Text>
                        <Text>Você possui {lancamentosPesquisa.length || 0} registro(s)</Text>
                    </Paper>
                    <TextInput
                        placeholder="Buscar Lançamento"
                        mb="md"
                        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                        value={procurar}
                        onChange={(e) => setProcurar(e.target.value)}
                    />
                    <Group>
                        <Filtro
                            labelTexto="Filtro por Status"
                            valor={filtroStatus}
                            valorMudou={setFiltroStatus}
                        />
                        <Button component={Link} href="/lancamento-financeiro/registro">+ Novo Lançamento</Button>
                    </Group>
                </Group>
                {lancamentosPesquisa.length ?
                    <>
                        <Tabela lancamentos={itensAtuais} />
                        <Pagination
                            defaultValue={paginaAtiva}
                            onChange={setPaginaAtiva}
                            total={Math.ceil(lancamentosPesquisa.length / itensPorPagina)}
                        />
                    </>
                    :
                    <Container size={"xs"}>
                        <Text p={"xl"}>
                            Olá {usuario.nome}, você não possui lançamento cadastrado!
                        </Text>
                        <Text p={"xl"}>
                            Nenhuma correspondência de filtro ou busca!
                        </Text>
                    </Container>
                }
            </Container>
        </>
    )
}
