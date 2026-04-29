import DeleteColourAlert from "@/app/(dashboard)/dashboard/colours/_components/delete-alert";
import UpdateColourDialog from "@/app/(dashboard)/dashboard/colours/_components/update-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColourQueryResponseType } from "@/fromServer/helpers/types/colour.type";
import { CircleIcon, Clock, PencilEditIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";

const columnHelper =
  createColumnHelper<ColourQueryResponseType["query"][number]>();

export const colourColumns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Colour Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("hexCode", {
    header: "Hex Code",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("hexCode", {
    header: "Colour Preview",
    cell: (info) => {
      return (
        <div
          className="w-8 h-8 rounded-full border"
          style={
            info.getValue()
              ? { backgroundColor: info.getValue() }
              : { backgroundColor: "transparent" }
          }
        ></div>
      );
    },
  }),
  columnHelper.display({
    id: "statistics",
    header: "Statistics",
    cell: ({ row }) => {
      const { _count } = row.original;
      const data = Object.entries(_count).map(([key, value]) => ({
        identifier: key,
        value: value,
      }));
      return (
        <div className="flex flex-col justify-start items-start gap-1">
          {data.map((item, index: number) => (
            <Badge key={index}>
              <HugeiconsIcon icon={CircleIcon} size={4} color="#000" />
              {item.value} {item.identifier}
            </Badge>
          ))}
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "timestamps",
    header: "Date",
    cell: ({ row }) => {
      const { createdAt, updatedAt } = row.original;
      return (
        <div className="flex flex-col justify-start items-start gap-1">
          <Badge variant="ghost">
            <HugeiconsIcon icon={Clock} /> Created {moment(createdAt).fromNow()}
          </Badge>
          <Badge variant="ghost">
            <HugeiconsIcon icon={Clock} />
            Updated {moment(updatedAt).fromNow()}
          </Badge>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const { refetch } = table.options.meta ?? {};
      const data = row.original;
      return (
        <div className="flex justify-start items-center gap-1">
          <UpdateColourDialog oldData={data} />
          <DeleteColourAlert refetch={refetch} item={data} />
        </div>
      );
    },
  }),
];
