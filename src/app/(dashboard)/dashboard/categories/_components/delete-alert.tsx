import { useDeleteCategory } from "@/app/(dashboard)/dashboard/categories/_components/query";
import { useDeleteProduct } from "@/app/(dashboard)/dashboard/products/_components/query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CategoryQueryResponseType } from "@/fromServer/helpers/types/category.type";
import { ProductQueryResponseType } from "@/fromServer/helpers/types/product.type";
import { Trash } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function DeleteCategoryAlert({
  item,
}: {
  item: CategoryQueryResponseType["query"][number];
}) {
  const { mutate } = useDeleteCategory();
  const queryClient = useQueryClient();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon-sm">
          <HugeiconsIcon icon={Trash} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {item.name}</AlertDialogTitle>
          <AlertDialogDescription>
            All the products that related with this category, will be set
            undefined. You can't undo this action
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutate(item.id, {
                onSuccess: (data) => {
                  if (data.success) {
                    queryClient.invalidateQueries({ queryKey: ["categories"] });
                    toast.success("Delete category success");
                  } else {
                    toast.error(data.message);
                  }
                },
              });
            }}
            variant="destructive"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
