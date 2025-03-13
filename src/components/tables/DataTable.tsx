'use client';

import React, { useState, useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

interface DataTableProps<T extends object> {
  data: T[];
  columns: {
    header: string;
    accessorKey: keyof T;
    cell?: (info: any) => React.ReactNode;
  }[];
  title?: string;
  subtitle?: string;
}

export function DataTable<T extends object>({
  data,
  columns,
  title,
  subtitle,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  
  const columnHelper = createColumnHelper<T>();
  
  // Memoize columns configuration
  const tableColumns = useMemo(() => 
    columns.map((col) => 
      columnHelper.accessor(col.accessorKey as any, {
        header: col.header,
        cell: col.cell
          ? (info) => col.cell!(info)
          : (info) => info.getValue(),
      })
    ), [columns, columnHelper]
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100">
      <div className="p-6">
        {title && (
          <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
        )}
        {subtitle && (
          <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-y border-gray-100">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`
                      px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                      ${header.column.getCanSort() ? 'cursor-pointer hover:bg-gray-50' : ''}
                    `}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                      <span className="text-gray-400">
                        {{
                          asc: ' ↑',
                          desc: ' ↓',
                        }[header.column.getIsSorted() as string] ?? ''}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="
                  border-b border-gray-50 last:border-0
                  transition-colors hover:bg-gray-50/50
                "
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
