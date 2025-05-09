import { Table, type TableCellProps } from '@chakra-ui/react';

export const FillWidthCell = (props: FillWidthCellProps) => (
  <Table.Cell w="full" p="0" {...props}>
    {''}
  </Table.Cell>
);

type FillWidthCellProps = Omit<TableCellProps, 'children'>;
