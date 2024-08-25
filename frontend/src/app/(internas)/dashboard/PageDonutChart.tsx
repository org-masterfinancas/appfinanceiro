import { DonutChart } from '@mantine/charts';
import { dataDonutChart } from './data';
import { ResumoStatus } from './dataDonuChart';

interface PageDonutChartProps {
  resumo: ResumoStatus[]
}

export default function PageDonutChart({resumo}: PageDonutChartProps) {
  return <DonutChart size={300} thickness={40} withLabelsLine withLabels data={resumo} />;
}