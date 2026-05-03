import { productColumns } from "@/app/(dashboard)/dashboard/products/_components/table/columns";
import { productVariantsColumns } from "@/app/(dashboard)/dashboard/products/detail/[slug]/_components/table/columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VariantQueryResponseType } from "@/fromServer/helpers/types/variant.type";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function ProductVariantsTable({
  data,
}: {
  data?: VariantQueryResponseType["query"];
}) {
  const table = useReactTable({
    data: data as VariantQueryResponseType["query"],
    columns: productVariantsColumns,
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
