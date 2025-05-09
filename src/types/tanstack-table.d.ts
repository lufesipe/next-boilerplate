import type { CellContext, RowData, TableCellProps } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface FiltersColumnDef {
    filterOptions?: SelectOption[];
  }

  interface FilterFns {
    filterMultiple: typeof filterMultiple;
  }

  interface ColumnMeta<TData extends RowData, TValue> {
    getCellContext: (context: CellContext<TData, TValue>) => TableCellProps | void;
  }

  interface ColumnDefBase<TData extends RowData, TValue = unknown> extends ColumnDefExtensions<TData, TValue> {
    filterOptions?: SelectOption[];
  }
}
