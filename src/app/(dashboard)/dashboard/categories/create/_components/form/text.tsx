import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

export function NameInput({
  name,
}: {
  name: {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
  };
}) {
  return (
    <Field className="flex-1">
      <FieldLabel htmlFor="category-name">Category Name</FieldLabel>
      <Input
        defaultValue={name.value}
        onChange={(e) => {
          name.setValue(e.target.value);
        }}
        id="category-name"
        placeholder="e.g T-Shirt"
        required
      />
    </Field>
  );
}

export function DescriptionInput({
  description,
}: {
  description: {
    value: string | undefined;
    setValue: Dispatch<SetStateAction<string | undefined>>;
  };
}) {
  return (
    <Field className="flex-1 flex flex-col justify-start items-stretch">
      <FieldLabel htmlFor="category-description">
        Category Description
      </FieldLabel>
      <Textarea
        defaultValue={description.value}
        onChange={(e) => {
          if (e.target.value === "") {
            description.setValue(undefined);
            return;
          }
          description.setValue(e.target.value);
        }}
        className={cn("", "flex-1")}
        id="category-description"
        placeholder="e.g This product made from highest quality"
      />
    </Field>
  );
}
