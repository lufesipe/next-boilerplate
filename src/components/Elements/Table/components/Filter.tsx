import type { Column, ReactTable, Updater } from '@/lib/reactTable';
import { useEffect, useState } from 'react';
import { Input, InputGroup, type InputProps } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { Select } from '../../Select';

export const Filter = <DataTable extends Record<string, unknown>>({
  column,
  getPreFilteredRowModel,
}: FilterProps<DataTable>) => {
  const [value, setValue] = useState<Updater<unknown>>();

  const firstValue = getPreFilteredRowModel().flatRows[0]?.getValue(column.id);
  const isNumericColumn = typeof firstValue === 'number';
  const columnFilterValue = column.getFilterValue();
  const haveOptions = !!column.columnDef.filterOptions?.length;

  useEffect(() => {
    const timeout = setTimeout(() => column.setFilterValue(value), 500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (haveOptions) {
    const sortedOptions = (column.columnDef.filterOptions || []).sort((a, b) => a.name.localeCompare(b.name));
    return (
      <Select
        options={sortedOptions}
        value={columnFilterValue as string[]}
        handleChange={(value) => column.setFilterValue(value)}
        size="sm"
        placeholder="-"
        pt="1"
        borderColor="gray.400"
      />
    );
  }

  if (isNumericColumn) {
    const value = (columnFilterValue as [number, number])?.[0];
    return (
      <InputGroup startElement={<FaSearch />}>
        <Input
          type="number"
          defaultValue={value}
          onChange={(e) => {
            const value = e.target.value;
            setValue([value, value]);
          }}
          {...commomProps}
        />
      </InputGroup>
    );
  }

  return (
    <InputGroup startElement={<FaSearch />}>
      <Input defaultValue={columnFilterValue as string} onChange={(e) => setValue(e.target.value)} {...commomProps} />
    </InputGroup>
  );
};

const commomProps: Omit<InputProps, 'onChange' | 'value'> = {
  minW: '60px',
  variant: 'flushed',
  paddingStart: 5,
  pt: '0.6rem',
  pb: '0.4rem',
  h: 'fit-content',
  borderColor: 'gray.400',
};

export type FilterProps<DataTable extends Record<string, unknown>> = {
  column: Column<DataTable, unknown>;
  getPreFilteredRowModel: ReactTable<DataTable>['getPreFilteredRowModel'];
};
