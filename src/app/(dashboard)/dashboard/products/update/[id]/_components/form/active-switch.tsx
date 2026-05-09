import { Field, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Dispatch, SetStateAction } from "react";

export default function ActiveSwitch({
  published,
}: {
  published: { value: boolean; setValue: Dispatch<SetStateAction<boolean>> };
}) {
  return (
    <Field
      orientation="horizontal"
      className="flex-1 cursor-pointer border p-2 md:p-1.5 rounded-lg md:mt-auto mt-2"
    >
      <FieldLabel htmlFor="publish-switch">Publish?</FieldLabel>
      <Switch
        id="publish-switch"
        checked={published.value}
        onCheckedChange={(e) => published.setValue(e)}
      />
    </Field>
  );
}
