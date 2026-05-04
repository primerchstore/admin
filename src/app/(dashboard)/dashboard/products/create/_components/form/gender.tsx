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
import { Dispatch, SetStateAction } from "react";

const GENDERS: Gender[] = ["MEN", "WOMEN", "UNISEX"];

export default function InputGender({
  gender,
}: {
  gender: { value: Gender; setValue: Dispatch<SetStateAction<Gender>> };
}) {
  return (
    <Field className="flex-1">
      <FieldLabel htmlFor="product-name">Set Gender</FieldLabel>
      <Select
        defaultValue={gender.value}
        onValueChange={(e) => gender.setValue(e as Gender)}
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
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
