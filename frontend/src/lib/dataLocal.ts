
export const obterDataHoraBr = () => {
  const now = new Date();
  const offset = 3 
  const utc3Date = new Date(now.getTime() - (offset * 60 * 60 * 1000))
  
  //const dataFormatada = utc3Date.toISOString();
  
  return utc3Date
};