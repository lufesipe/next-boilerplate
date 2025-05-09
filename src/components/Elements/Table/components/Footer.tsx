import { Table, type TableCellProps } from '@chakra-ui/react';
import type { HeaderGroup } from '@/lib/reactTable';
import { flexRender } from '@/lib/reactTable';
import { FillWidthCell } from './Cell/FillWidth';

export const TableFooter = <DataTable extends Record<string, unknown>>({
  footerGroup,
  options,
}: TableFooterProps<DataTable>) => {
  if (options?.hidden) return <></>;

  return (
    <Table.Footer>
      {footerGroup.map(({ id, headers }) => {
        return (
          <Table.Row key={id}>
            {headers.map(({ id, column, colSpan, isPlaceholder, getContext }) => (
              <Table.Cell key={id} colSpan={colSpan} {...options?.cellStyle}>
                {isPlaceholder ? null : flexRender(column.columnDef.footer, getContext())}
              </Table.Cell>
            ))}
            <FillWidthCell borderBottomRightRadius="xl" />
          </Table.Row>
        );
      })}
    </Table.Footer>
  );
};

export type TableFooterProps<DataTable extends Record<string, unknown>> = {
  footerGroup: HeaderGroup<DataTable>[];
  options?: FooterOptions;
};

export type FooterOptions = {
  cellStyle?: Omit<TableCellProps, 'children'>;
  hidden?: boolean;
};
