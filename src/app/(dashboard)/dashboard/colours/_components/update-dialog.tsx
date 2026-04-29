import { usePatchColour } from "@/app/(dashboard)/dashboard/colours/_components/query";
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
  ColourPostValidationType,
  ColourQueryResponseType,
} from "@/fromServer/helpers/types/colour.type";
import { PencilEditIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UpdateColourDialog({
  oldData,
}: {
  oldData: ColourQueryResponseType["query"][number];
}) {
  const [colourData, setColourData] = useState<ColourPostValidationType>({
    hexCode: "#000000",
    name: "",
  });

  useEffect(() => {
    setColourData(oldData);
  }, [oldData]);

  const { mutate } = usePatchColour();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleHexInput = (value: string) => {
    const hex = value.startsWith("#") ? value : `#${value}`;
    setColourData((prev) => ({ ...prev, hexCode: hex }));
  };

  const isValidHex = /^#([0-9A-Fa-f]{6})$/.test(colourData.hexCode);

  const updateHandle = () => {
    if (colourData.hexCode === "") {
      toast.error("Hex code cannot be empty!");
      return;
    }

    if (colourData.name === "") {
      toast.error("Name cannot be empty!");
      return;
    }

    mutate(
      { body: colourData, id: oldData.id },
      {
        onSuccess: (data) => {
          if (data.success) {
            queryClient.invalidateQueries({ queryKey: ["colours"] });
            toast.success("Colour updated");
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
          <DialogTitle className="text-center">Create new colour</DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="colour-name">Colour Name</FieldLabel>
              <Input
                id="colour-name"
                placeholder="e.g. Red Velvet"
                value={colourData.name}
                onChange={(e) =>
                  setColourData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="colour-code">Colour Code</FieldLabel>

              <div className="flex items-center gap-3">
                <div
                  className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-md border border-input shadow-sm transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: isValidHex
                      ? colourData.hexCode
                      : "#000000",
                  }}
                >
                  <input
                    type="color"
                    value={isValidHex ? colourData.hexCode : "#000000"}
                    onChange={(e) =>
                      setColourData((prev) => ({
                        ...prev,
                        hexCode: e.target.value,
                      }))
                    }
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </div>

                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    #
                  </span>
                  <Input
                    id="colour-code"
                    value={colourData.hexCode.replace("#", "")}
                    onChange={(e) => handleHexInput(e.target.value)}
                    placeholder="000000"
                    maxLength={6}
                    className="pl-7 font-mono uppercase"
                  />
                </div>

                <div
                  className="h-10 w-10 shrink-0 rounded-md border border-input shadow-inner transition-colors"
                  style={{
                    backgroundColor: isValidHex
                      ? colourData.hexCode
                      : "transparent",
                  }}
                />
              </div>

              {!isValidHex && colourData.hexCode !== "#000000" && (
                <p className="mt-1 text-xs text-destructive">
                  Enter a valid hex code (e.g. #FF5733)
                </p>
              )}
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button
            onClick={updateHandle}
            disabled={!isValidHex || !colourData.name}
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
