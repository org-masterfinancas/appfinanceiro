import { DonutChart } from '@mantine/charts';
import { ResumoStatus } from '../shared/interface';

interface PageDonutChartProps {
  resumo: ResumoStatus[]
}

export default function GraficoDespesaStatus({resumo}: PageDonutChartProps) {
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