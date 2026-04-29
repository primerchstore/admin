import {
  usePatchSizes,
  usePostSize,
} from "@/app/(dashboard)/dashboard/sizes/_components/query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  SizePostValidationType,
  SizeQueryResponseType,
} from "@/fromServer/helpers/types/size.type";
import { PencilEditIcon, Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UpdateSizeDialog({
  oldData,
}: {
  oldData: SizeQueryResponseType["query"][number];
}) {
  const [sizeData, setSizeData] = useState<SizePostValidationType>({
    code: "",
    name: "",
  });
  const { mutate } = usePatchSizes();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    setSizeData(oldData);
  }, [oldData]);

  const createHandle = () => {
    if (sizeData.code === "") {
      toast.error("Code cannot be empty!");
      return;
    }

    if (sizeData.name === "") {
      toast.error("Name cannot be empty!");
      return;
    }

    mutate(
      { body: sizeData, id: oldData.id },
      {
        onSuccess: (data) => {
          if (data.success) {
            queryClient.invalidateQueries({ queryKey: ["sizes"] });
            toast.success("Size updated");
            setDialogOpen(false);
          } else {
            toast.error(data?.message);
          }
        },
      },
    );
  };

  return (
    <Dialog
      defaultOpen={dialogOpen}
      open={dialogOpen}
      onOpenChange={(e) => setDialogOpen(!dialogOpen)}
    >
      <DialogTrigger asChild>
        <Button size="icon-sm">
          <HugeiconsIcon icon={PencilEditIcon} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Update colour</DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="colour-name">Colour Name</FieldLabel>
              <Input
                id="Size name"
                placeholder="e.g. Extra Large"
                value={sizeData.name}
                onChange={(e) =>
                  setSizeData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="colour-code">Code</FieldLabel>

              <Input
                id="Size code"
                placeholder="e.g. XL"
                value={sizeData.code}
                onChange={(e) =>
                  setSizeData((prev) => ({ ...prev, code: e.target.value }))
                }
                required
              />
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button
            disabled={sizeData.name === "" || sizeData.code === ""}
            onClick={createHandle}
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
