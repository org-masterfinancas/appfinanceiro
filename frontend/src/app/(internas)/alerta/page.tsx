// 'use client'
// import { useEffect, useState } from 'react';
// import { Container, SimpleGrid, Box, Loader } from '@mantine/core';
// import useApi from '@/app/(internas)/hooks/useApi';
// import { LinhasLancamentos } from './shared/interface';
// import { filtrarLancamentoAtrasadoDespesas } from '@/app/(internas)/alerta/despesa/despesa-filtro';
// import { filtrarLancamentoAtrasadoReceitas } from './receita/receita-filtro';
// import ReceitaPendente from './receita/ReceitaPendente';
// import DespesaPendente from './despesa/DespesaPendente';

    
// export default function Alertas() {

//     const { getApi } = useApi()

//     const [carregando, setCarregando] = useState<boolean>(true);

//     const [despesa, SetDespesa] = useState<LinhasLancamentos[]>([])
//     const [estatisticaDespesa, setEstatisticaDespesa] = useState<any>({})

//     const [receita, SetReceita] = useState<LinhasLancamentos[]>([])
//     const [estatisticaReceita, setEstatisticaReceita] = useState<any>({})

//     useEffect(() => {
//         async function obterLancamentos() {
//             const dados = await getApi('/lancamentofinanceiros/')

//             const resultadoDespesa = filtrarLancamentoAtrasadoDespesas(dados)
//             const { despesaFiltrada, despesaTotalizada } = resultadoDespesa
//             setEstatisticaDespesa(despesaTotalizada)
//             SetDespesa(despesaFiltrada)

//             const resultadoReceita = filtrarLancamentoAtrasadoReceitas(dados)
//             const { receitaFiltrada, receitaTotalizada } = resultadoReceita
//             setEstatisticaReceita(receitaTotalizada)
//             SetReceita(receitaFiltrada)
            
//             setCarregando(false)

//         }
//         obterLancamentos()
//     }, [])

//     if (carregando) return <Loader color="yellow" type="bars" />

//      return (
//         <Container size={'xl'}>
//             <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={'sm'}>
//                 <Box>
//                     <ReceitaPendente linhasLancamentos={receita} receitaTotalizada={estatisticaReceita} />
//                 </Box>
//                     <DespesaPendente linhasLancamentos={despesa} despesaTotalizada={estatisticaDespesa} />
//                 <Box>
//                 </Box>
//             </SimpleGrid>
//         </Container>
//     );
// }