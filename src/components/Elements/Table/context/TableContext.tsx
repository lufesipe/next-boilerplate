import type { PaginationState } from '@/lib/reactTable';
import type { FC, PropsWithChildren, Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react';

export const TableContext = createContext({} as TableContextProps);

export const TableProvider: FC<PropsWithChildren> = ({ children }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState(initialPagination);
  const [rowsLength, setRowsLength] = useState(0);

  const resetPagination = () => setPagination(initialPagination);

  return (
    <TableContext.Provider
      value={{
        globalFilter,
        pagination,
        rowsLength,
        resetPagination,
        setGlobalFilter,
        setPagination,
        setRowsLength,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

const initialPagination = {
  pageIndex: 0,
  pageSize: 10,
};

type TableContextProps = {
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  rowsLength: number;
  setRowsLength: Dispatch<SetStateAction<number>>;
  resetPagination: () => void;
};
