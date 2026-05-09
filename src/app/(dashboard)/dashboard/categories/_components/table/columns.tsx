import DeleteCategoryAlert from "@/app/(dashboard)/dashboard/categories/_components/delete-alert";
import DeleteProductAlert from "@/app/(dashboard)/dashboard/products/_components/delete-alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryQueryResponseType } from "@/fromServer/helpers/types/category.type";
import { ProductQueryResponseType } from "@/fromServer/helpers/types/product.type";
import {
  CheckCircle,
  CircleIcon,
  Clock,
  Eye,
  FemaleSymbolFreeIcons,
  GridIcon,
  ImageDelete01Icon,
  MaleSymbolFreeIcons,
  PencilEditIcon,
  SquaresExcludeFreeIcons,
  Trash,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const columnHelper =
  createColumnHelper<CategoryQueryResponseType["query"][number]>();

export const categoryColumns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
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
            <div className="w-20 flex justify-center cursor-pointer items-center">
              <Image
                src={medias[0].media.url}
                alt="image"
                loading="lazy"
                width={200}
                height={200}
                className="w-full h-full object-cover rounded-lg border border-primary/20"
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
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex justify-start items-center gap-1">
          <Button size="icon-sm" asChild>
            <Link href={`/dashboard/categories/detail/${data.slug}`}>
              <HugeiconsIcon icon={Eye} />
            </Link>
          </Button>
          <Button size="icon-sm" asChild>
            <a href={`/dashboard/categories/update/${data.id}`}>
              <HugeiconsIcon icon={PencilEditIcon} />
            </a>
          </Button>

          <DeleteCategoryAlert item={data} />
        </div>
      );
    },
  }),
];
