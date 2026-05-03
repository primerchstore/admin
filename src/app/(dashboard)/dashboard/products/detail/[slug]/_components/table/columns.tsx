import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VariantQueryResponseType } from "@/fromServer/helpers/types/variant.type";
import {
  CheckCircle,
  Clock,
  Eye,
  ImageDelete01Icon,
  PencilEditIcon,
  Trash,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const columnHelper =
  createColumnHelper<VariantQueryResponseType["query"][number]>();

export const productVariantsColumns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "properties",
    header: "Properties",
    cell: ({ row }) => {
      const { colour, size } = row.original;
      return (
        <div className="flex gap-1 justify-center items-center">
          {colour && (
            <div
              className="w-8 h-8 border border-primary/10 flex justify-center items-center text-xs font-semibold"
              style={{ backgroundColor: colour.hexCode }}
            ></div>
          )}
          {size && (
            <div className="w-8 h-8 border border-primary/10 flex justify-center items-center text-xs font-semibold">
              {size.code}
            </div>
          )}
        </div>
      );
    },
  }),
  columnHelper.accessor("sku", {
    header: "SKU",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("stock", {
    header: "Stock",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "media",
    header: "Image",
    cell: ({ row }) => {
      const { medias } = row.original;

      if (medias.length === 0) {
        return (
          <div className="w-20 p-3 flex justify-center cursor-pointer items-center">
            <HugeiconsIcon
              className="text-muted-foreground"
              icon={ImageDelete01Icon}
            />
          </div>
        );
      }

      return (
        <Dialog>
          <DialogTrigger asChild>
            <div className="w-20 relative flex justify-center cursor-pointer items-center">
              <Badge className="absolute -top-1 -right-1 z-2">
                {medias.length}
              </Badge>
              <Image
                src={medias[0].media.url}
                alt="image"
                loading="lazy"
                width={200}
                height={200}
                className="w-full z-1 h-full object-cover rounded-lg border border-primary/20"
              />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Product Image</DialogTitle>
            </DialogHeader>
            <Image
              src={medias[0].media.url}
              alt="image"
              loading="lazy"
              width={800}
              height={800}
              className="w-full h-full object-cover rounded-lg border border-primary/20"
            />
          </DialogContent>
        </Dialog>
      );
    },
  }),

  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => `$${info.getValue()}`,
  }),

  columnHelper.accessor("isActive", {
    header: "Active",
    cell: (info) => {
      return info.getValue() ? (
        <Badge>
          <HugeiconsIcon icon={CheckCircle} /> Active
        </Badge>
      ) : (
        <Badge variant="secondary">Inactive</Badge>
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
      const data = row.original;
      return (
        <div className="flex justify-start items-center gap-1">
          <Button size="icon-sm" asChild>
            <Link href={`/dashboard/variants/detail/${data.id}`}>
              <HugeiconsIcon icon={Eye} />
            </Link>
          </Button>
          <Button size="icon-sm">
            <HugeiconsIcon icon={PencilEditIcon} />
          </Button>

          <Button variant="destructive" size="icon-sm">
            <HugeiconsIcon icon={Trash} />
          </Button>
        </div>
      );
    },
  }),
];
