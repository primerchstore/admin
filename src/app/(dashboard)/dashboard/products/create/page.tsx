"use client";

import { usePostProduct } from "@/app/(dashboard)/dashboard/products/_components/query";
import ActiveSwitch from "@/app/(dashboard)/dashboard/products/create/_components/form/active-switch";
import InputCategory from "@/app/(dashboard)/dashboard/products/create/_components/form/category";
import InputGender from "@/app/(dashboard)/dashboard/products/create/_components/form/gender";
import TagInput from "@/app/(dashboard)/dashboard/products/create/_components/form/tag";
import {
  DescriptionInput,
  NameInput,
  PriceInput,
} from "@/app/(dashboard)/dashboard/products/create/_components/form/text";
import MediaInput from "@/app/_components/media";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Gender } from "@/fromServer/generated/prisma";
import { ProductPostValidationType } from "@/fromServer/helpers/types/product.type";
import { ImagePlus, PencilEdit01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, SubmitEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string | undefined>();
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [price, setPrice] = useState<number | undefined>();
  const [tags, setTags] = useState<string[]>([]);
  const [gender, setGender] = useState<Gender | null>(null);
  const [publish, setPublish] = useState<boolean>(true);
  const [media, setMedia] = useState<string[]>([]);
  const { mutate, isPending } = usePostProduct();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [productBody, setProductBody] = useState<ProductPostValidationType>({
    name,
    description,
    categoryId,
    gender,
    tags,
    basePrice: price ?? 0,
    isActive: publish,
    addedMedias: media,
  });

  useEffect(() => {
    setProductBody({
      name,
      description,
      categoryId,
      basePrice: price ?? 0,
      tags,
      isActive: publish,
      addedMedias: media,
    });
  }, [name, description, categoryId, price, tags, gender, publish, media]);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(productBody, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success("Product");
          queryClient.invalidateQueries({ queryKey: ["products"] });
          router.push("/dashboard/products");
        }
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid md:h-full md:grid-rows-[1fr_auto] grid-cols-1 md:grid-cols-2 gap-4"
    >
      <FieldGroup className="p-4 border border-primary/5 rounded-xl">
        <FieldSet className="h-full flex flex-col justify-start items-stretch">
          <FieldLegend className="flex justify-center items-center gap-2">
            <HugeiconsIcon icon={PencilEdit01FreeIcons} /> Information
          </FieldLegend>
          <FieldDescription></FieldDescription>
          <FieldGroup className="flex-1 flex flex-col justify-start items-stretch">
            <Field>
              <NameInput name={{ value: name, setValue: setName }} />
            </Field>

            <Field orientation="responsive">
              <InputCategory
                category={{ value: categoryId, setValue: setCategoryId }}
              />
              <PriceInput price={{ value: price, setValue: setPrice }} />
            </Field>

            <Field orientation="responsive">
              <InputGender gender={{ value: gender, setValue: setGender }} />
              <ActiveSwitch
                published={{ value: publish, setValue: setPublish }}
              />
            </Field>

            <TagInput tags={{ value: tags, setValue: setTags }} />
            <DescriptionInput
              description={{ value: description, setValue: setDescription }}
            />
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
      <FieldGroup className="p-4 border border-primary/5 rounded-xl">
        <FieldSet className="h-full flex flex-col justify-start items-stretch">
          <FieldLegend className="flex justify-center items-center gap-2">
            <HugeiconsIcon icon={ImagePlus} /> Media
          </FieldLegend>
          <FieldDescription>
            Upload new image or select from available images. First one is cover
          </FieldDescription>
          <MediaInput media={{ value: media, setValue: setMedia }} />
        </FieldSet>
      </FieldGroup>
      <FieldGroup className="md:col-span-2">
        <Field orientation="responsive" className="justify-end">
          <Button disabled={isPending} variant="secondary" asChild>
            <Link href={`/dashboard/products`}>Cancel</Link>
          </Button>
          <Button disabled={isPending} type="submit">
            Create
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
