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
import { CategoryQueryResponseType } from "@/fromServer/helpers/types/category.type";
import { Dispatch, SetStateAction } from "react";

export default function ParentInput({
  parentId,
}: {
  parentId: {
    value: string | undefined | null;
    setValue: Dispatch<SetStateAction<string | undefined | null>>;
  };
}) {
  const { data, isLoading } = useQueryCategory({
    order: "desc",
    page: 1,
    sort: "createdAt",
    take: 100,
  });

  if (isLoading) return <div>Loaing...</div>;
  return (
    <Field className="flex-1">
      <FieldLabel htmlFor="product-name">Parent</FieldLabel>
      <Select
        onValueChange={(e) => {
          if (e === "unset") parentId.setValue(null);
          else parentId.setValue(e);
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <SelectTrigger className="w-full" disabled>
            <SelectValue placeholder="Loading..." />
          </SelectTrigger>
        ) : (
          <Select
            value={parentId.value === null ? "unset" : parentId.value}
            onValueChange={(e) => parentId.setValue(e === "unset" ? null : e)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Parent" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Parent</SelectLabel>
                {data?.result?.query?.map(
                  (
                    item: CategoryQueryResponseType["query"][number],
                    index: number,
                  ) => (
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
      </Select>
    </Field>
  );
}
