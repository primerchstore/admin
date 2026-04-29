import { useDeleteSizes } from "@/app/(dashboard)/dashboard/sizes/_components/query";
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
import { SizeQueryResponseType } from "@/fromServer/helpers/types/size.type";
import { Trash } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";

export default function DeleteSizeAlert({
  item,
  refetch,
}: {
  item: SizeQueryResponseType["query"][number];
  refetch?: () => void;
}) {
  const { mutate } = useDeleteSizes();
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
            All the variant that has relation with this colour, will be set
            undefined. You can't undo this action
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutate(item.id, {
                onSuccess: () => {
                  refetch?.();
                  toast.success("Delete colour success");
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
