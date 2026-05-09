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
  isLoading,
}: {
  gender: {
    value: Gender | null;
    setValue: Dispatch<SetStateAction<Gender | null>>;
  };
  isLoading: boolean;
}) {
  console.log({ gender });
  if (isLoading) return <div>Loading...</div>;
  return (
    <Field className="flex-1">
      <FieldLabel htmlFor="product-name">Set Gender</FieldLabel>
      <Select
        onValueChange={(e) => {
          if (e === "unset") gender.setValue(null);
          else gender.setValue(e as Gender);
        }}
        disabled={isLoading}
      >
        {isLoading && gender ? (
          <SelectTrigger className="w-full" disabled>
            <SelectValue placeholder="Loading..." />
          </SelectTrigger>
        ) : (
          <Select
            defaultValue={gender.value === null ? "unset" : gender.value}
            onValueChange={(e) => {
              if (!isLoading && gender) {
                gender.setValue(e === "unset" ? null : (e as Gender));
              }
            }}
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
        )}
      </Select>
    </Field>
  );
}
