import type { CellContext } from '@/lib/reactTable';
import { isValidElement } from 'react';

export const BaseCell = <DataTable extends Record<string, unknown>>({
  getValue,
  emptyContentCell = '-',
}: BaseCellProps<DataTable>) => {
  const value = getValue();

  if (isValidElement(value)) return value;

  if (typeof value === 'undefined' || value === null || typeof value === 'object' || typeof value === 'boolean')
    return <>{emptyContentCell}</>;

  if (typeof value === 'string' || typeof value === 'number') {
    const stringfiedValue = String(value);

    if (stringfiedValue.length <= 0) return <>{emptyContentCell}</>;

    return <>{stringfiedValue}</>;
  }

  return <>{emptyContentCell}</>;
};

export type BaseCellProps<DataTable extends Record<string, unknown>, ValueType = unknown> = CellContext<
  DataTable,
  ValueType
> & {
  emptyContentCell?: string;
};
