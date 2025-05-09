import type { Row } from '@/lib/reactTable';

export const filterMultiple = <TData extends Record<string, unknown>>(
  row: Row<TData>,
  columnId: string,
  filterValue: string[]
): boolean => {
  if (!filterValue.length) return true;

  const value = row.getValue(columnId);
  const canReturnRow = filterValue.includes(value as string);
  return canReturnRow;
};
