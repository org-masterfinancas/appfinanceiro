
import { BarChart } from '@mantine/charts';
import { ResumoMensal } from './resumo-despesa-mensal';

interface PageBarChartProps {
  resumo: ResumoMensal[]
}
export default function GraficoDespesaMensal({ resumo }: PageBarChartProps) {

  return (
    <BarChart
      h={300}
      data={resumo}
      dataKey="mes"
      withLegend
      withBarValueLabel
      legendProps={{ verticalAlign: 'bottom', height: 50 }}
      yAxisLabel="Despesas R$"
      valueFormatter={(value) => new Intl.NumberFormat('pt-BR').format(value)}
      
      series={[
        { name: 'Consolidado', color: 'indigo.6' },
        { name: 'Pendente', color: 'yellow.6' },
        { name: 'Cancelado', color: 'red.6' },
      ]}
    />
  );
}

