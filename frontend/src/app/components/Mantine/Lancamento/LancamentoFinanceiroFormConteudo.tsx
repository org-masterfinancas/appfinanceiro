'use client'
import { DateInput, DateInputProps } from "@mantine/dates";
import dayjs from "dayjs";
import { NumberInput, SegmentedControl, Select, TextInput } from "@mantine/core";
import { UseFormReturnType } from '@mantine/form';
import { LancamentoFinanceiro } from "../../../data/model/lancamentoFinanceiro";

interface LancamentoFinanceiroFormConteudoProps {
  form: UseFormReturnType<LancamentoFinanceiro>;
  EhAlterado: boolean;
  novoLancamento: boolean;
}

const dateParser: DateInputProps['dateParser'] = (input) => {
  return dayjs(input, 'YYYY-MM-DD').toDate();
}

export default function LancamentoFinanceiroFormConteudo({
  form,
  EhAlterado,
  novoLancamento,
}: LancamentoFinanceiroFormConteudoProps) {

  return (
    <div>
      <div>
        {novoLancamento ?
          false
          : (
            <>
              <TextInput
                {...form.getInputProps("id")}
                key={form.key("id")}
                label="Id"
                type="text"
                name="id"
                readOnly
              />
            </>
          )
        }
        <TextInput
          {...form.getInputProps('descricaoLancamento')}
          
          key={form.key('descricaoLancamento')}
          label="Descrição"
          name="descricaolancamento"
          readOnly={!EhAlterado}
        />
        <Select
          {...form.getInputProps('statusLancamento')}
          key={form.key('statusLancamento')}
          label="Status"
          data={['Pendente', 'Consolidado', 'Cancelado']}
          readOnly={!EhAlterado}
        />
      </div>
      <div>
        <DateInput
          {...form.getInputProps("dataCriacaoLancamento")}
          key={form.key('dataCriacaoLancamento')}
          dateParser={dateParser}
          valueFormat="YYYY-MM-DD"
          label='Data'
          name="datalancamento"
          readOnly={!EhAlterado}
        />
        <NumberInput
          {...form.getInputProps("valorLancamento")}
          key={form.key("valorLancamento")}
          label="Valor R$"
          name="valorlancamento"
          prefix={'R$'}
          decimalScale={2}
          readOnly={!EhAlterado}
        />
        <SegmentedControl mt={"md"} mb={'md'}
          {...form.getInputProps("tipoLancamento")}
          key={form.key("tipoLancamento")}
          data={[
            { label: 'Receita', value: 'Receita' },
            { label: 'Despesa', value: 'Despesa' },
          ]}
          readOnly={!EhAlterado}
        />
      </div>
    </div>
  );
}
