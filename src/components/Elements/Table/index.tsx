'use client';

import { useEffect, useState } from 'react';
import { Flex, Table as ChakraTable } from '@chakra-ui/react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnFiltersState,
  type InitialTableState,
  type ReactTableOptions,
} from '@/lib/reactTable';
import { filterMultiple } from './utils/filterMultiple';
import { type BodyOptions, TableBody } from './components/Body';
import { BaseCell } from './components/Cell/Base';
import { type FooterOptions, TableFooter } from './components/Footer';
import { type HeaderOptions, TableHeader } from './components/Head';
import { useTable } from './hooks/useTable';

export const Table = <TableType extends Record<string, unknown>>({
  data,
  columns,
  initialState,
  options,
}: TableProps<TableType>) => {
  const { globalFilter, pagination, setGlobalFilter, setPagination, setRowsLength, resetPagination } = useTable();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(initialState?.columnFilters || []);

  const { getFooterGroups, getHeaderGroups, getRowModel, getRowCount, getPreFilteredRowModel } =
    useReactTable<TableType>({
      data,
      columns,
      defaultColumn: {
        cell: (cellProps) => BaseCell({ emptyContentCell: '-', ...cellProps }),
      },
      initialState,
      state: { columnFilters, globalFilter, pagination },
      filterFns: {
        filterMultiple: filterMultiple<TableType>,
      },
      autoResetPageIndex: false,
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      onPaginationChange: setPagination,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });

  useEffect(() => {
    setRowsLength(getRowCount());
    resetPagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRowCount()]);

  return (
    <Flex
      px="2"
      w="full"
      maxW="full"
      borderRadius="xl"
      bgColor="white"
      boxShadow="1px 1px 4px 0px rgba(0,0,0,0.1)"
      overflow="auto"
    >
      <ChakraTable.Root w="full" maxW="full" bgColor="white">
        <TableHeader<TableType>
          headerGroup={getHeaderGroups()}
          options={options?.header}
          getPreFilteredRowModel={getPreFilteredRowModel}
        />
        <TableBody<TableType>
          rowModel={getRowModel()}
          options={options?.body}
          isFooterHidden={options?.footer?.hidden}
        />
        <TableFooter<TableType> footerGroup={getFooterGroups()} options={options?.footer} />
      </ChakraTable.Root>
    </Flex>
  );
};

export type TableProps<TableType extends Record<string, unknown>> = {
  initialState?: InitialTableState;
  options?: TableOptions;
} & Pick<UseTableProps<TableType>, 'data' | 'columns'>;

type TableOptions = {
  body?: BodyOptions;
  footer?: FooterOptions;
  header?: HeaderOptions;
};

type UseTableProps<TableType> = Omit<ReactTableOptions<TableType>, 'getCoreRowModel'>;
