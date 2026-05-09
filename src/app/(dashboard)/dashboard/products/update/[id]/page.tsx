"use client";
import {
  DescriptionInput,
  NameInput,
  PriceInput,
} from "@/app/(dashboard)/dashboard/products/update/[id]/_components/form/text";
import { useGetProduct } from "@/app/(dashboard)/dashboard/products/detail/[slug]/_components/query";
import EmptyData from "@/app/_components/empty-data";
import LoadingData from "@/app/_components/loading-data";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Gender } from "@/fromServer/generated/prisma";
import {
  ImagePlus,
  Package01Icon,
  PencilEdit01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitEvent, use, useEffect, useState } from "react";
import InputCategory from "@/app/(dashboard)/dashboard/products/update/[id]/_components/form/category";
import InputGender from "@/app/(dashboard)/dashboard/products/update/[id]/_components/form/gender";
import ActiveSwitch from "@/app/(dashboard)/dashboard/products/update/[id]/_components/form/active-switch";
import TagInput from "@/app/(dashboard)/dashboard/products/update/[id]/_components/form/tag";
import MediaInput from "@/app/_components/media";
import { usePatchProduct } from "@/app/(dashboard)/dashboard/products/_components/query";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading, isSuccess } = useGetProduct({ by: "id", value: id });

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string | undefined | null>();
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [price, setPrice] = useState<number | undefined>();
  const [tags, setTags] = useState<string[]>([]);
  const [gender, setGender] = useState<Gender | null>(null);
  const [publish, setPublish] = useState<boolean>(true);
  const [media, setMedia] = useState<string[]>([]);
  const [addedMedia, setAddedMedia] = useState<string[]>([]);
  const [deletedMedia, setDeletedMedia] = useState<string[]>([]);

  useEffect(() => {
    if (isSuccess && data.result) {
      setName(data.result.name);
      setDescription(data.result.description);
      setCategoryId(data.result.category?.id);
      setPrice(Number(data.result.basePrice));
      setTags(data.result.tags.map((item) => item.tag.name));
      setPublish(data.result.isActive);
      setGender(data.result.gender);
      setMedia(data.result.medias.map((item) => item.media.id));
    }
  }, [data?.result?.id]);

  const { mutate, isPending } = usePatchProduct();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        body: {
          name,
          description,
          tags,
          categoryId,
          gender,
          isActive: publish,
          basePrice: price,
          addedMedias: addedMedia,
          deletedMedias: deletedMedia,
        },
        id,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success("Product updated successfully");
            queryClient.invalidateQueries({ queryKey: ["products"] });
            router.push("/dashboard/products");
          } else {
            toast.error(data.message);
          }
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      },
    );
  };

  if (isLoading) return <LoadingData />;
  if (!data || data.statusCode !== 200)
    return <EmptyData title="Product" icon={Package01Icon} />;

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
              {!isLoading && (
                <InputGender
                  isLoading={isLoading}
                  gender={{ value: gender, setValue: setGender }}
                />
              )}
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
          <MediaInput
            addedMedia={{ value: addedMedia, setValue: setAddedMedia }}
            deletedMedia={{ value: deletedMedia, setValue: setDeletedMedia }}
            media={{ value: media, setValue: setMedia }}
          />
        </FieldSet>
      </FieldGroup>

      <FieldGroup className="md:col-span-2">
        <Field orientation="responsive" className="justify-end">
          <Button disabled={isPending} variant="secondary" asChild>
            <Link href={`/dashboard/products`}>Cancel</Link>
          </Button>
          <Button disabled={isPending} type="submit">
            Update
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
