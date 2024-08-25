import dayjs from 'dayjs';
import { DateInput, DateInputProps } from '@mantine/dates';


export function formatarData(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  }
  
  
export const obterDataHoraBr = () => {
  const now = new Date();
  const offset = 3 
  const utc3Date = new Date(now.getTime() - (offset * 60 * 60 * 1000))
  //const dataFormatada = utc3Date.toISOString();
  return utc3Date
}
export const formatDate = (dateString: any): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}



export const dateParser: DateInputProps['dateParser'] = (input) => {
  if (input === 'WW2') {
    return new Date(1939, 8, 1);
  }

  return dayjs(input, 'YYYY-MM-DD').toDate();
};