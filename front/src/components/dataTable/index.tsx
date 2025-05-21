import { ArrowDown } from "@/assets/icons/arrowDown";
import { ArrowUp } from "@/assets/icons/arrowUp";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { type Dispatch, type SetStateAction, useMemo, useState } from "react";

type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  totalDocs?: number;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination?: Dispatch<SetStateAction<PaginationState>>;
  search?: string;
  setSearch?: Dispatch<SetStateAction<string>>;
  isLoading?: boolean;
  isDashboard?: boolean;
};

const pageSizeOptions = [10, 20, 50];

export function DataTable<Data extends object>({
  data,
  columns,
  isDashboard,
  totalDocs,
  pagination,
  setPagination,
  search,
  setSearch,
  isLoading = false,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const paginationMemo = useMemo(() => {
    if (pagination) {
      return {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      };
    }
  }, [pagination]);

  const table = useReactTable({
    data,
    columns,
    pageCount: Number(pagination?.pageIndex) + 1,
    state: {
      sorting,
      pagination: paginationMemo,
      globalFilter: search,
    },
    globalFilterFn: "auto",
    onGlobalFilterChange: setSearch,
    enableGlobalFilter: true,
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const totalPages = Math.ceil(
    Number(totalDocs) / Number(pagination?.pageSize)
  );

  const handlePreviousClick = () => {
    if (setPagination && pageIndex > 0) {
      setPagination({
        pageIndex: pageIndex - 1,
        pageSize: table.getState().pagination.pageSize,
      });
    }
  };

  const handleNextClick = () => {
    if (setPagination && pageIndex < totalPages - 1) {
      setPagination({
        pageIndex: pageIndex + 1,
        pageSize: table.getState().pagination.pageSize,
      });
    }
  };

  const renderColumnWidth = (id: string) => {
    switch (id) {
      case "actions":
        return "w-[15%]";
      case "balance":
      case "accessLevel":
        return "w-[20%]";
      default:
        return "w-[20%]";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full mt-2 text-sm text-left border border-white/10 rounded-md">
        <thead className="bg-neutral-800 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta: any = header.column.columnDef.meta;
                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`p-3 cursor-pointer ${renderColumnWidth(
                      header.id
                    )} ${meta?.isNumeric ? "text-right" : "text-left"}`}
                  >
                    <div className="flex items-center gap-1">
                      {header.column.getIsSorted() === "desc" && <ArrowDown />}
                      {header.column.getIsSorted() === "asc" && <ArrowUp />}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        {!isLoading && !table.getRowModel().rows.length ? (
          <tbody>
            <tr>
              <td colSpan={table.getHeaderGroups()[0]?.headers.length || 1}>
                <div className="flex flex-col items-center justify-center h-64 gap-4 text-white">
                  <p className="text-2xl">No data found</p>
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={"bg-transparent"}>
                {row.getVisibleCells().map((cell) => {
                  const meta: any = cell.column.columnDef.meta;
                  return (
                    <td
                      key={cell.id}
                      className={`p-3 ${renderColumnWidth(cell.column.id)} ${
                        meta?.isNumeric ? "text-right" : "text-left"
                      }`}
                    >
                      <div className="flex items-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {!isDashboard && (
        <div className="flex justify-end mt-4 gap-6 text-white">
          <div className="relative">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="bg-neutral-700 text-sm rounded px-3 py-1"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  teste: {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousClick}
              disabled={pageIndex === 0}
              className="px-2 py-1 bg-neutral-700 rounded hover:bg-neutral-600 disabled:opacity-30"
            >
              Anterior
            </button>
            <span>
              Página {pageIndex + 1} de {totalPages}
            </span>
            <button
              onClick={handleNextClick}
              disabled={pageIndex >= totalPages - 1}
              className="px-2 py-1 bg-neutral-700 rounded hover:bg-neutral-600 disabled:opacity-30"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
