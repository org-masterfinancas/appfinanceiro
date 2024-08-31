import { DonutChart } from '@mantine/charts';
import { dataDonutChart } from '../data';
import { ResumoStatus } from './resumo-receita-status';

interface PageDonutChartProps {
  resumo: ResumoStatus[]
}

export default function GraficoReceitaStatus({resumo}: PageDonutChartProps) {
  return (
  <DonutChart 
  size={250} 
  thickness={30} 
  withLabelsLine 
  paddingAngle={11}
 chartLabel="Qtd por Status"
  withLabels data={resumo} />
  )
}