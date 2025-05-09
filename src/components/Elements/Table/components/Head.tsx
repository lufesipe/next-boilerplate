import { Table, type TableHeaderProps } from '@chakra-ui/react';
import type { HeaderGroup, RowModel } from '@/lib/reactTable';
import { flexRender } from '@/lib/reactTable';
import { FillWidthCell } from './Cell/FillWidth';
import { Filter } from './Filter';

export const TableHeader = <DataTable extends Record<string, unknown>>({
  headerGroup,
  options,
  getPreFilteredRowModel,
}: TableHeadProps<DataTable>) => {
  if (options?.hidden) return <></>;

  return (
    <Table.Header>
      {headerGroup.map(({ id, headers }) => {
        return (
          <Table.Row key={id} w="full">
            {headers.map(({ column, getContext, id, isPlaceholder }) => (
              <Table.ColumnHeader key={id} {...options?.cellStyle} _first={{ borderTopLeftRadius: 'xl' }}>
                {isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}
                {column.columnDef.enableColumnFilter && (
                  <Filter<DataTable> column={column} getPreFilteredRowModel={getPreFilteredRowModel} />
                )}
              </Table.ColumnHeader>
            ))}
            <FillWidthCell borderTopRightRadius="xl" />
          </Table.Row>
        );
      })}
    </Table.Header>
  );
};

export type TableHeadProps<DataTable extends Record<string, unknown> = Record<string, unknown>> = {
  headerGroup: HeaderGroup<DataTable>[];
  options?: Omit<HeaderOptions, 'cellStyle'> & {
    cellStyle?: Omit<HeaderOptions['cellStyle'], 'onCopy'>;
  };
  getPreFilteredRowModel: () => RowModel<DataTable>;
};

export type HeaderOptions = {
  cellStyle?: Omit<TableHeaderProps, 'children'>;
  hidden?: boolean;
};
