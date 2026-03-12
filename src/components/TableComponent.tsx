import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef, Table } from "@tanstack/react-table";
import {
  TbChevronLeft,
  TbChevronRight,
  TbChevronsLeft,
  TbChevronsRight,
  TbFilter,
  TbFilterX,
} from "react-icons/tb";
import * as XLSX from "xlsx";
import { CiSearch } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";

interface PaginationTableProps<T> {
  columns: ColumnDef<T, any>[];
  TableData: T[];
  title?: string;
}

function PaginationTable<T extends object>({
  columns,
  TableData,
  title,
}: PaginationTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<T[]>([...TableData]);
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [sorting, setSorting] = useState<any[]>([]);
  const [showFilterInputs, setShowFilterInputs] = useState(false);

  const table: Table<T> = useReactTable({
    data,
    columns,
    state: { columnFilters, sorting },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleDownload = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    XLSX.writeFile(workbook, `${title || "document"}.xlsx`);
  };

  const toggleFilterInputs = () => {
    setShowFilterInputs(!showFilterInputs);
    if (!showFilterInputs) setColumnFilters([]);
  };

  useEffect(() => {
    const filteredData = TableData.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
    setData(filteredData);
  }, [searchTerm, TableData]);

  return (
    <div className="w-full bg-black text-white pb-12">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-2 justify-between bg-[#f5f5f520] min-w-[250px] items-center p-3 text-white rounded-[10px] outline-none">
            <input
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none border-none bg-transparent font-[500] tracking-wide w-full focus-within:outline-none font-man text-[14px]"
            />
            <CiSearch className="text-[20px]" />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            title="Filter"
            onClick={toggleFilterInputs}
            className="text-white border border-[#232323] px-4 py-1 rounded cursor-pointer"
          >
            {showFilterInputs ? (
              <TbFilterX className="text-[20px]" />
            ) : (
              <TbFilter className="text-[20px]" />
            )}
          </button>
          <button
            onClick={handleDownload}
            title="Download"
            className="text-white border border-[#232323] px-4 py-1 rounded cursor-pointer"
          >
            <MdOutlineFileDownload className="text-[20px]" />
          </button>
        </div>
      </div>

      <div className="overflow-auto border border-gray-700 rounded-[10px]">
        <table className="min-w-full table-auto">
          <thead className="bg-[#0F0F0F] font-semibold text-[#D0D0D1] text-sm border-b border-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={() => header.column.toggleSorting()}
                    className="p-3 py-4 text-left cursor-pointer"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : ""}
                  </th>
                ))}
              </tr>
            ))}
            {showFilterInputs && (
              <tr>
                {table.getHeaderGroups()[0]?.headers.map((header) => (
                  <th key={`${header.id}-filter`} className="p-2">
                    {header.column.getCanFilter() && (
                      <input
                        type="text"
                        className="bg-[#0F0F0F] border border-gray-700 rounded-[10px] px-2 py-2 w-full text-xs text-white"
                        placeholder={`Filter`}
                        value={
                          columnFilters.find((f) => f.id === header.id)
                            ?.value || ""
                        }
                        onChange={(e) =>
                          header.column.setFilterValue(e.target.value)
                        }
                      />
                    )}
                  </th>
                ))}
              </tr>
            )}
          </thead>

          <tbody className="divide-y divide-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-[#0F0F0F]">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col text-sm sm:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-gray-400 ">
          {table.getPrePaginationRowModel().rows.length} Rows
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Page</span>
          <span className="font-semibold">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <span className="text-sm text-gray-400">| Go to page:</span>
          <input
            type="number"
            min={1}
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) =>
              table.setPageIndex(
                e.target.value ? Number(e.target.value) - 1 : 0,
              )
            }
            className="bg-[#0F0F0F] border border-gray-700 px-2 py-1 w-16 text-white rounded-[10px]"
          />

          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="bg-[#0F0F0F] border border-gray-700 rounded-[10px] px-2 py-1 text-white"
          >
            {[10, 15, 20, 25].map((size) => (
              <option key={size} value={size} className="text-black">
                {size}
              </option>
            ))}
          </select>

          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="p-2 disabled:opacity-50"
          >
            <TbChevronsLeft />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-2 disabled:opacity-50"
          >
            <TbChevronLeft />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-2 disabled:opacity-50"
          >
            <TbChevronRight />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="p-2 disabled:opacity-50"
          >
            <TbChevronsRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaginationTable;
