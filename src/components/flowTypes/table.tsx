"use client";
import React from "react";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { flowTypeType } from "@/types/flowType";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "../ui/table";
import originalDayjs from "@/lib/dayjs";
import { Button } from "../ui/button";
import { Operations } from "./operations";

export const FlowTypeTableColumns: ColumnDef<flowTypeType>[] = [
	{
		accessorKey: "name",
		header: "名称",
		accessorFn: (data) => data.name,
	},
	{
		accessorKey: "createBy",
		header: "创建人",
		accessorFn: (data) => data.createBy,
	},
	{
		accessorKey: "createdAt",
		header: "创建时间",
		accessorFn: (data) => data.createdAt,
		cell({ row }) {
			const time = row.getValue("createdAt") as Date;
			return originalDayjs(time).format("YYYY-MM-DD HH:mm:ss");
		},
	},
	{
		accessorKey: "operations",
		header: "操作",
		cell({ row }) {
			const data = row.original;
			return <Operations data={data} />;
		},
	},
];

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function FlowTypeTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="rounded-md border">
			<Table className="min-w-[672px] scroll-auto">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext()
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
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center"
							>
								暂时没有内容
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
