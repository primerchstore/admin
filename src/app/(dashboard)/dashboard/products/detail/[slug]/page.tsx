"use client";

import {
  useGetProduct,
  useGetProductTotalStock,
} from "@/app/(dashboard)/dashboard/products/detail/[slug]/_components/query";
import ProductVariantsTable from "@/app/(dashboard)/dashboard/products/detail/[slug]/_components/table/table";
import { useQueryVariant } from "@/app/(dashboard)/dashboard/variants/_components/query";
import EmptyData from "@/app/_components/empty-data";
import LoadingData from "@/app/_components/loading-data";
import { Badge } from "@/components/ui/badge";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  Chat,
  CheckListFreeIcons,
  Eye,
  GitBranchIcon,
  Image01FreeIcons,
  ImageRemove01FreeIcons,
  List,
  Package01Icon,
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
  const { data, isLoading } = useGetProduct({ by: "slug", value: slug });
  const { data: stock, isLoading: stockLoading } = useGetProductTotalStock({
    enabled: !!data?.result?.id,
    productId: data?.result?.id ?? "",
  });
  const { data: variants, isLoading: variantsLoading } = useQueryVariant(
    {
      take: 10,
      order: "desc",
      page: 1,
      sort: "createdAt",
      productId: data?.result?.id,
    },
    !!data?.result?.id,
  );
  if (isLoading) return <LoadingData />;
  if (!data || data.statusCode !== 200)
    return <EmptyData title="Product" icon={Package01Icon} />;
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
                <FieldLabel htmlFor="product-id">Product ID</FieldLabel>
                <Input id="product-id" value={data.result?.id} disabled />
              </Field>
              <Field className="flex-1">
                <FieldLabel htmlFor="product-slug">Product Slug</FieldLabel>
                <Input id="product-slug" value={data.result?.slug} disabled />
              </Field>
            </Field>
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
        {data.result?.medias && data.result.medias.length === 0 && (
          <EmptyData title="Media" icon={Image01FreeIcons} />
        )}
        {data.result?.medias && data.result.medias.length > 0 && (
          <div className="w-full grid gap-2 grid-rows-2 grid-cols-2 md:grid-cols-4">
            {data.result.medias.map((item, index: number) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden border border-primary/10 relative flex"
              >
                {index === 0 && (
                  <Badge className="z-2 absolute top-1 right-1">Cover</Badge>
                )}
                <Image
                  alt="cover"
                  width={400}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover z-1"
                  src={item.media.url}
                />
              </div>
            ))}
          </div>
        )}
      </FieldGroup>
      <FieldSet className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
        <div className="p-8 border bg-primary border-primary-2 rounded-xl flex justify-center items-stretch">
          <div className="flex-1 flex flex-col justify-center gap-2 items-start">
            <h3 className="text-primary-2/30 uppercase text-xs font-bold">
              Total Stock
            </h3>
            {stockLoading ? (
              <Spinner />
            ) : (
              <p className="text-2xl font-bold text-background">
                {stock?.result?.stock}
              </p>
            )}
          </div>
          <div className="flex justify-center items-center">
            <HugeiconsIcon
              icon={List}
              className="text-muted-foreground"
              size={32}
            />
          </div>
        </div>
        <div className="p-8 border bg-primary border-primary-2 rounded-xl flex justify-center items-stretch">
          <div className="flex-1 flex flex-col justify-center gap-2 items-start">
            <h3 className="text-primary-2/30 uppercase text-xs font-bold">
              Sold
            </h3>
            <p className="text-2xl font-bold text-background">
              {data.result?.sold}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <HugeiconsIcon
              icon={CheckListFreeIcons}
              className="text-muted-foreground"
              size={32}
            />
          </div>
        </div>
        <div className="p-8 border bg-primary-2 border-primary-2 rounded-xl flex justify-center items-stretch">
          <div className="flex-1 flex flex-col justify-center gap-2 items-start">
            <h3 className="text-primary/30 uppercase text-xs font-bold">
              Variants
            </h3>
            <p className="text-2xl font-bold">{data.result?._count.variants}</p>
          </div>
          <div className="flex justify-center items-center">
            <HugeiconsIcon
              icon={GitBranchIcon}
              className="text-muted-foreground"
              size={32}
            />
          </div>
        </div>

        <div className="p-8 border bg-primary-2 border-primary-2 rounded-xl flex justify-center items-stretch">
          <div className="flex-1 flex flex-col justify-center gap-2 items-start">
            <h3 className="text-primary/30 uppercase text-xs font-bold">
              Views
            </h3>
            <p className="text-2xl font-bold">
              {data.result?._count.productViews}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <HugeiconsIcon
              icon={Eye}
              className="text-muted-foreground"
              size={32}
            />
          </div>
        </div>

        <div className="p-8 border bg-primary-2 border-primary-2 rounded-xl flex justify-center items-stretch">
          <div className="flex-1 flex flex-col justify-center gap-2 items-start">
            <h3 className="text-primary/30 uppercase text-xs font-bold">
              Reviews
            </h3>
            <p className="text-2xl font-bold">{data.result?._count.reviews}</p>
          </div>
          <div className="flex justify-center items-center">
            <HugeiconsIcon
              icon={Chat}
              className="text-muted-foreground"
              size={32}
            />
          </div>
        </div>

        <div className="p-8 border bg-primary-2 border-primary-2 rounded-xl flex justify-center items-stretch">
          <div className="flex-1 flex flex-col justify-center gap-2 items-start">
            <h3 className="text-primary/30 uppercase text-xs font-bold">
              Wishlist
            </h3>
            <p className="text-2xl font-bold">
              {data.result?._count.wishlists}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <HugeiconsIcon
              icon={Bookmark}
              className="text-muted-foreground"
              size={32}
            />
          </div>
        </div>
      </FieldSet>
      <FieldGroup className="md:col-span-2 p-4 border border-primary/5 rounded-xl">
        <FieldSet>
          <FieldLegend className="flex justify-center items-center gap-2">
            <HugeiconsIcon icon={GitBranchIcon} /> Variants
          </FieldLegend>
          <FieldDescription></FieldDescription>
          <FieldGroup>
            {variantsLoading && <LoadingData />}
            {!variantsLoading &&
              variants?.result?.query &&
              variants.result.query.length === 0 && (
                <EmptyData title="Variants" icon={GitBranchIcon} />
              )}
            {!variantsLoading &&
              variants?.result?.query &&
              variants.result.query.length > 0 && (
                <ProductVariantsTable data={variants.result?.query} />
              )}
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  );
}
