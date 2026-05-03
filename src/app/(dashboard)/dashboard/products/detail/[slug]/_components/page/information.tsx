import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductGetResponseType } from "@/fromServer/helpers/types/product.type";
import { cn } from "@/lib/utils";
import { PencilEdit01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function ProductInformation({
  data,
}: {
  data?: ProductGetResponseType;
}) {
  return (
    <FieldGroup className="p-4 border border-primary/5 rounded-xl">
      <FieldSet className="h-full flex flex-col justify-start items-stretch">
        <FieldLegend className="flex justify-center items-center gap-2">
          <HugeiconsIcon icon={PencilEdit01FreeIcons} /> Information
        </FieldLegend>
        <FieldDescription></FieldDescription>
        <FieldGroup className="flex-1 flex flex-col justify-start items-stretch">
          <Field orientation="responsive">
            <Field className="flex-1">
              <FieldLabel htmlFor="product-id">Product ID</FieldLabel>
              <Input id="product-id" value={data?.id} disabled />
            </Field>
            <Field className="flex-1">
              <FieldLabel htmlFor="product-slug">Product Slug</FieldLabel>
              <Input id="product-slug" value={data?.slug} disabled />
            </Field>
          </Field>
          <Field orientation="responsive">
            <Field className="flex-1">
              <FieldLabel htmlFor="product-name">Product Name</FieldLabel>
              <Input id="product-name" value={data?.name} required disabled />
            </Field>

            <Field className="flex-1">
              <FieldLabel htmlFor="product-base-price">
                Product Base Price
              </FieldLabel>
              <Input
                id="product-base-price"
                value={`$${String(Number(data?.basePrice))}`}
                required
                disabled
              />
            </Field>
          </Field>

          <Field className="flex-1 flex flex-col justify-start items-stretch">
            <FieldLabel htmlFor="product-description">
              Product Description
            </FieldLabel>
            <Textarea
              className={cn("", !data?.description && "italic flex-1")}
              id="product-description"
              disabled
              value={data?.description || "No description set"}
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  );
}
