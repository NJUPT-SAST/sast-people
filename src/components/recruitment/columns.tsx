'use client';
import { calScore } from '@/action/exam-map/calScore';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { Checkbox } from '../ui/checkbox';

export const columns: ColumnDef<
  Awaited<ReturnType<typeof calScore>>[number]
>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'studentId',
    header: '学号',
  },
  {
    accessorKey: 'name',
    header: '姓名',
  },
  {
    accessorKey: 'totalScore',
    header: '总分',
    filterFn: (row, id, filterValue) => {
      return row.original.totalScore
        ? parseInt(row.original.totalScore) >= parseInt(filterValue)
        : false;
    },
  },
];

export const Table: React.FC = () => {
  return <></>;
};
