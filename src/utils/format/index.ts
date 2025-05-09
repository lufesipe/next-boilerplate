export const formatToCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

export const maskPhone = (value: string) => {
  const phone = value.replace(/\D/g, '').substring(0, 11);
  return phone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
};

export const clearPhoneMask = (value: string) => value.replace(/\D/g, '');

export const clearCurrencyMask = (value: string) =>
  Number(
    value
      .replace(/[^\d.,]/g, '')
      .replaceAll('.', '')
      .replace(',', '.')
  );
