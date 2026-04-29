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
import { useDeleteMedia } from "@/app/(dashboard)/dashboard/medias/_components/query";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Trash } from "@hugeicons/core-free-icons";
import { useState } from "react";

export default function DeleteMediaAlert({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: () => void;
}) {
  const { mutate } = useDeleteMedia();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="ml-auto" size="icon-sm">
          <HugeiconsIcon icon={Trash} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete media?</AlertDialogTitle>
          <AlertDialogDescription>
            You will cannot access the dashboard, unless signin again!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutate(id, {
                onSuccess: () => {
                  onSuccess?.();
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
