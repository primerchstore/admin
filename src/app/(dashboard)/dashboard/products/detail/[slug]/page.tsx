"use client";

import { useGetProduct } from "@/app/(dashboard)/dashboard/products/detail/[slug]/_components/query";
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
import { cn } from "@/lib/utils";
import {
  ImageRemove01FreeIcons,
  PencilEdit01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data } = useGetProduct({ by: "slug", value: slug });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FieldGroup className="p-4 border border-primary/5 rounded-xl">
        <FieldSet>
          <FieldLegend className="flex justify-center items-center gap-2">
            <HugeiconsIcon icon={PencilEdit01FreeIcons} /> Information
          </FieldLegend>
          <FieldDescription></FieldDescription>
          <FieldGroup>
            <Field orientation="responsive">
              <Field className="flex-1">
                <FieldLabel htmlFor="product-name">Product Name</FieldLabel>
                <Input
                  id="product-name"
                  value={data?.result?.name}
                  required
                  disabled
                />
              </Field>

              <Field className="flex-1">
                <FieldLabel htmlFor="product-base-price">
                  Product Base Price
                </FieldLabel>
                <Input
                  id="product-base-price"
                  value={`$${String(Number(data?.result?.basePrice))}`}
                  required
                  disabled
                />
              </Field>
            </Field>

            <Field>
              <FieldLabel htmlFor="product-description">
                Product Description
              </FieldLabel>
              <Textarea
                className={cn("", !data?.result?.description && "italic")}
                id="product-description"
                disabled
                value={data?.result?.description || "No description set"}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
      <FieldGroup className="p-4 border border-primary/5 rounded-xl">
        <FieldSet>
          <FieldLegend className="flex justify-center items-center gap-2">
            <HugeiconsIcon icon={PencilEdit01FreeIcons} /> Media
          </FieldLegend>
          <FieldDescription></FieldDescription>
        </FieldSet>
        <div className="flex w-full md:h-full h-50">
          <div className="w-1/2 md:w-1/4 border border-primary/10 rounded-xl overflow-hidden h-full flex justify-center items-center">
            {data?.result?.medias.length !== 0 ? (
              <Image
                src={data?.result?.medias[0].media.url || ""}
                alt="image"
                width={500}
                height={500}
                className="w-full  h-full object-cover"
              />
            ) : (
              <HugeiconsIcon icon={ImageRemove01FreeIcons} />
            )}
          </div>
        </div>
      </FieldGroup>
      <FieldSet className="md:col-span-2 bg-red-200">_Info</FieldSet>
    </div>
  );
}
