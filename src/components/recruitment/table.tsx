'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { batchEndByUid } from '@/action/flow/edit';
import { batchSendEmail } from '@/action/user/sendEmail';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  flowTypeId: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  flowTypeId,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rowSelection,
      columnFilters,
    },
  });

  return (
    <>
      <div className="flex items-center pt-10 gap-3">
        <Input
          placeholder="筛选分数线"
          value={
            (table.getColumn('totalScore')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('totalScore')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
          disabled={table.getSelectedRowModel().rows.length === 0}
          onClick={async () => {
            // get not selected rows
            const selectedRows = table.getSelectedRowModel().flatRows;
            const notSelectedRows = table
              .getRowModel()
              .flatRows.filter((row) => !selectedRows.includes(row));
            toast.promise(
              Promise.all([
                batchSendEmail(
                  selectedRows.map((row) => (row.original as any).uid),
                  flowTypeId,
                  true,
                ).then(async () => {
                  await batchEndByUid(
                    flowTypeId,
                    (selectedRows[0].original as any).stepId,
                    'accepted',
                    selectedRows.map((row) => (row.original as any).uid),
                  );
                }),
                batchSendEmail(
                  notSelectedRows.map((row) => (row.original as any).uid),
                  flowTypeId,
                  false,
                ).then(async () => {
                  batchEndByUid(
                    flowTypeId,
                    (notSelectedRows[0].original as any).stepId,
                    'rejected',
                    notSelectedRows.map((row) => (row.original as any).uid),
                  );
                }),
              ]),
              {
                loading: '正在确认',
                success: '确认成功',
                error: '确认失败',
              },
            );
          }}
        >
          确认选中同学通过
        </Button>
        <span className='text-muted-foreground text-sm'>同时修改流程与发送邮件，请谨慎操作</span>
      </div>
      <div className="rounded-md border">
        <div className="flex-1 text-sm text-muted-foreground p-3">
          {table.getFilteredSelectedRowModel().rows.length} /{' '}
          {table.getFilteredRowModel().rows.length} 行选中
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
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
      </div>
    </>
  );
}
