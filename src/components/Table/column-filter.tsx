import { Column, RowData } from "@tanstack/react-table"
import DebounceInputText from "../Forms/debounce-input-text"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

declare module '@tanstack/react-table' {
    //allows us to define custom properties for our columns
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: 'text' | 'range' | 'select' | 'date'
    }
}

export default function TableColumnFilter({ column }: { column: Column<any, unknown> }) {
    const { filterVariant } = column.columnDef.meta ?? {}

    const columnFilterValue = column.getFilterValue()

    const sortedUniqueValues = filterVariant === 'range'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys())

    return filterVariant === 'range'
        ? <div>
            <div className="flex space-x-2">
                <DebounceInputText
                    type="number"
                    min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                    max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                    value={(columnFilterValue as [number, number])?.[0] ?? ''}
                    onChange={value => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
                    placeholder={`Min ${column.getFacetedMinMaxValues()?.[0] !== undefined
                        ? `(${column.getFacetedMinMaxValues()?.[0]})`
                        : ''}`}
                    className="w-24 text-xs"
                />
                <DebounceInputText
                    type="number"
                    min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                    max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                    value={(columnFilterValue as [number, number])?.[1] ?? ''}
                    onChange={value => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
                    placeholder={`Max ${column.getFacetedMinMaxValues()?.[1]
                        ? `(${column.getFacetedMinMaxValues()?.[1]})`
                        : ''}`}
                    className="w-24 text-xs"
                />
            </div>
        </div>
        : filterVariant === 'select'
            ?
            // <select
            //     onChange={e => column.setFilterValue(e.target.value)}
            //     value={columnFilterValue?.toString()}
            //     className="h-10 w-fit rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background "
            // >
            //     <option value="">All</option>
            //     {sortedUniqueValues.map(value => (
            //         //dynamically generated select options from faceted values feature
            //         <option value={value} key={value}>
            //             {value}
            //         </option>
            //     ))}
            // </select>
            <Select
                value={columnFilterValue ? columnFilterValue?.toString() : null}
                onValueChange={(value) => { column.setFilterValue(value) }}
            >
                <SelectTrigger className="">
                    <SelectValue placeholder={`All`} />
                </SelectTrigger>
                <SelectContent side="top">
                    <SelectItem value={null}>All</SelectItem>
                    {sortedUniqueValues.map((value) => (
                        <SelectItem key={value} value={`${value}`}>
                            {value}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            // <DataTableFacetedFilter
            //     column={column}
            //     title={columnFilterValue?.toString()}
            //     options={sortedUniqueValues.map((status) => ({
            //         label: status[0]?.toUpperCase() + status.slice(1),
            //         value: status,
            //         // icon: getStatusIcon(status),
            //         withCount: true,
            //     }))}
            // />
            : <DebounceInputText
                type="text"
                value={(columnFilterValue ?? '') as string}
                onChange={value => column.setFilterValue(value)}
                placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
                className="w-32 text-xs"
                list={column.id + 'list'}
            />
}