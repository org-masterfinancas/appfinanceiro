import { DonutChart } from '@mantine/charts';
import { dataDonutChart } from '../data';
import { ResumoStatus } from './dataDonuChart';

interface PageDonutChartProps {
  resumo: ResumoStatus[]
}

export default function PageDonutChart({resumo}: PageDonutChartProps) {
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