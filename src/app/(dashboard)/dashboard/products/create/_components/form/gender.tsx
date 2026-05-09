import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gender } from "@/fromServer/generated/prisma";
import { GENDERS } from "@/types/gender.type";
import { Dispatch, SetStateAction } from "react";

export default function InputGender({
  gender,
}: {
  gender: {
    value: Gender | null;
    setValue: Dispatch<SetStateAction<Gender | null>>;
  };
}) {
  return (
    <Field className="flex-1">
      <FieldLabel htmlFor="product-name">Set Gender</FieldLabel>
      <Select
        defaultValue={gender.value || "unset"}
        onValueChange={(e) =>
          gender.setValue(e === "unset" ? null : (e as Gender))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Gender</SelectLabel>
            {GENDERS.map((item, index: number) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
            <SelectItem value="unset">Unset</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
