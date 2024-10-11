'use client';
import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
import { Button } from '@/components/ui/button';
import originalDayjs from '@/lib/dayjs';
import {
  Pagination,
  PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { SearchInput } from './searchInput';
import { EditUserInfoDialog } from './editUserInfoDialog';
import { RemoveUserInfoDialog } from './removeUserInfoDialog';
import { Workflow } from 'lucide-react';
import { EditUserFlowSheet } from './editUserFlowSheet';
import { useCollegeListClient } from '@/hooks/useCollegeListClient';
// 定义用户类型
type UserType = {
  id: number;
  name: string;
  studentId: string | null;
  phoneNumber: string | null;
  email: string | null;
  department: string | null;
  group: string | null;
  createdAt: Date;
};

// 定义表格列

export const ManageTable = ({
  users,
  totalCount,
  totalPages,
  search,
}: {
  users: UserType[];
  totalCount: number;
  totalPages: number;
  search: string;
}) => {
  const colleges = useCollegeListClient();
  const columns: ColumnDef<UserType>[] = [
    {
      accessorKey: 'name',
      header: '姓名',
    },
    {
      accessorKey: 'studentId',
      header: '学号',
    },
    {
      accessorKey: 'phoneNumber',
      header: '手机号码',
    },
    {
      accessorKey: 'email',
      header: '邮箱',
    },
    {
      accessorKey: 'createdAt',
      header: '创建时间',
      cell: ({ row }) => {
        const date = row.getValue('createdAt') as Date;
        return originalDayjs(date).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <>
          <EditUserInfoDialog userInfo={row.original} colleges={colleges} />
          <EditUserFlowSheet userInfo={row.original} />
          <RemoveUserInfoDialog uid={row.original.id} />
        </>
      ),
    },
  ];
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <SearchInput defaultValue={search} />
        </div>
        <div className="flex space-x-2">
          {/* <Button>导入</Button>
          <Button>导出</Button>
          <Button variant="default">+ 添加用户</Button> */}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
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
                  暂时没有用户数据
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div>显示 1-10 共 {users.length} 结果</div>
        <div>
          <PaginationComponent
            totalItems={totalCount}
            pageSize={10}
            currentPage={1}
          />
        </div>
      </div>
    </div>
  );
};
