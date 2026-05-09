import { useQueryCategory } from "@/app/(dashboard)/dashboard/categories/_components/query";
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
import {
  CategoryQueryResponseType,
  CategoryQueryValidationType,
} from "@/fromServer/helpers/types/category.type";
import { Dispatch, SetStateAction, useState } from "react";

export default function InputCategory({
  category,
}: {
  category: {
    value: string | undefined;
    setValue: Dispatch<SetStateAction<string | undefined>>;
  };
}) {
  const [categoryQuery] = useState<CategoryQueryValidationType>({
    order: "desc",
    page: 1,
    sort: "createdAt",
    take: 100,
  });
  const { data, isLoading } = useQueryCategory(categoryQuery);
  return (
    <Field className="flex-1">
      <FieldLabel htmlFor="product-name">Category</FieldLabel>
      {data && (
        <Select
          value={category.value}
          onValueChange={(e) =>
            category.setValue(e === "unset" ? undefined : e)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              {!isLoading &&
                data &&
                data.result &&
                data.result.query &&
                data.result.query.map(
                  (
                    item: CategoryQueryResponseType["query"][number],
                    index: number,
                  ) =>
                    item && (
                      <SelectItem key={index} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ),
                )}
              <SelectItem value="unset">Unset</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </Field>
  );
}
