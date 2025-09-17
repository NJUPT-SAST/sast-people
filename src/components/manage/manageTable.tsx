'use client';
import {
  PaginationComponent
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import originalDayjs from '@/lib/dayjs';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { EditUserFlowSheet } from './editUserFlowSheet';
import { EditUserInfoDialog } from './editUserInfoDialog';
import { RemoveUserInfoDialog } from './removeUserInfoDialog';
import { SearchInput } from './searchInput';
import { userType } from '@/types/user';


// 定义表格列

export const ManageTable = ({
  users,
  totalCount,
  totalPages,
  search,
  currentPage,
}: {
  users: userType[];
  totalCount: number;
  totalPages: number;
  search: string;
  currentPage: number;
}) => {
  const columns: ColumnDef<userType>[] = [
    {
      accessorKey: 'name',
      header: '姓名',
      cell(props) {
        return <div className="w-[80px]">{props.row.original.name}</div>;
      },
    },
    {
      accessorKey: 'studentId',
      header: '学号',
    },
    {
      accessorKey: 'phone',
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
        return (
          <div className="w-[80px]">
            {originalDayjs(date).format('YYYY-MM-DD')}
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="w-[80px] flex gap-3 mr-4">
          {/* <EditUserInfoDialog userInfo={row.original}/> */}
          <EditUserFlowSheet userInfo={row.original} />
          <RemoveUserInfoDialog uid={row.original.id} />
        </div>
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
        <div>
          显示 {currentPage === 1 ? currentPage : currentPage * 10} - {currentPage === 1 ? currentPage + 9 : currentPage * 10 + 9} 共{' '}
          {users.length} 结果
        </div>
        <div>
          <PaginationComponent
            totalItems={totalCount}
            pageSize={10}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};
