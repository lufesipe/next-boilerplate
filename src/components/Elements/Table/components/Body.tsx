import { Table, type TableCellProps } from '@chakra-ui/react';
import type { RowModel } from '@/lib/reactTable';
import { flexRender } from '@/lib/reactTable';
import { FillWidthCell } from './Cell/FillWidth';

export const TableBody = <DataTable extends Record<string, unknown>>({
  rowModel: { rows },
  isFooterHidden = false,
  options,
}: TableBodyProps<DataTable>) => (
  <Table.Body>
    {rows.map(({ getVisibleCells, id }) => {
      return (
        <Table.Row
          key={id}
          css={{
            '&:last-of-type td': {
              borderBottom: isFooterHidden ? 'none' : '1px solid rgb(228, 228, 231)',
            },
          }}
        >
          {getVisibleCells().map(({ column, id, getContext }) => {
            const meta = getContext().cell.column.columnDef.meta;

            return (
              <Table.Cell
                key={id}
                {...options?.cellStyle}
                {...meta?.getCellContext(getContext())}
                minWidth={column.columnDef.minSize}
                maxWidth={column.columnDef.maxSize}
                width={column.getSize()}
                _first={{
                  borderBottomLeftRadius: isFooterHidden ? 'xl' : undefined,
                }}
              >
                {flexRender(column.columnDef.cell, getContext())}
              </Table.Cell>
            );
          })}
          <FillWidthCell borderBottomRightRadius={isFooterHidden ? 'xl' : undefined} />
        </Table.Row>
      );
    })}
  </Table.Body>
);

export type TableBodyProps<DataTable extends Record<string, unknown> = Record<string, unknown>> = {
  rowModel: RowModel<DataTable>;
  options?: BodyOptions;
  isFooterHidden?: boolean;
};

export type BodyOptions = {
  cellStyle?: Omit<TableCellProps, 'children'>;
};
