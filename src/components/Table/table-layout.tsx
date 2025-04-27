
import { ColumnDef, flexRender, getCoreRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";


import { cn } from "@/utils/helper/style-merger";
import { ArrowUpDown, MoveDown, MoveUp } from "lucide-react";
import { Separator } from "../ui/separator";
import TableColumnFilter from "./column-filter";
import Pagination from "./pagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export default function TableLayout<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(), //client-side filtering
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(), // client-side faceting
        getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
        getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    })

    return <div>
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="text-sm">
                        {headerGroup.headers.map((header) => <TableHead colSpan={header.colSpan} key={header.id} className="pb-3">
                            {header.isPlaceholder
                                ? null
                                : <>
                                    <div className={cn(`flex items-center gap-2 font-bold mb-1 `,
                                        header.column.getCanSort() ? 'cursor-pointer select-none' : '')}
                                        onClick={header.column.getToggleSortingHandler()} >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {header.column.columnDef?.enableSorting === false ? null : ({
                                            asc: <MoveDown size={14} />,
                                            desc: <MoveUp size={14} />,
                                        }[header.column.getIsSorted() as string] ?? <ArrowUpDown size={14} />)}
                                    </div>
                                    {header.column.getCanFilter()
                                        ? <TableColumnFilter column={header.column} />
                                        : null}
                                </>}
                        </TableHead>)}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            className=""
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                            <Separator orientation="vertical" />
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                        >
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>

        <Pagination table={table} />
    </div>
}