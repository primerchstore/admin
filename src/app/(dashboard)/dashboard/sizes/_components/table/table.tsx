import { sizeColumns } from "@/app/(dashboard)/dashboard/sizes/_components/table/columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SizeQueryResponseType } from "@/fromServer/helpers/types/size.type";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function SizeTable({
  data,
  refetch,
}: {
  data?: SizeQueryResponseType["query"];
  refetch: () => void;
}) {
  const table = useReactTable({
    data: data as SizeQueryResponseType["query"],
    columns: sizeColumns,
    meta: {
      refetch,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header, index: number) => (
              <TableHead
                key={index}
                onClick={header.column.getToggleSortingHandler()}
                style={{ cursor: "pointer" }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell, index: number) => (
              <TableCell key={index}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
