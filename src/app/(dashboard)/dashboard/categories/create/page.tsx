"use client";

import {
  DescriptionInput,
  NameInput,
} from "@/app/(dashboard)/dashboard/categories/create/_components/form/text";
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
import { CategoryPostValidationType } from "@/fromServer/helpers/types/category.type";
import { ImagePlus, PencilEdit01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";
import ParentInput from "@/app/(dashboard)/dashboard/categories/create/_components/form/parent";
import { usePostCategory } from "@/app/(dashboard)/dashboard/categories/_components/query";
import { toast } from "sonner";

export default function Page() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string | undefined>();
  const [media, setMedia] = useState<string[]>([]);
  const [parentId, setParentId] = useState<string>();
  const { mutate, isPending } = usePostCategory();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [categoryBody, setCategoryBody] = useState<CategoryPostValidationType>({
    name,
    description,
    parentId,
    addedMedias: media,
  });

  useEffect(() => {
    setCategoryBody({
      name,
      description,
      parentId,
      addedMedias: media,
    });
  }, [name, description, media, parentId]);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(categoryBody, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success("Category created");
          queryClient.invalidateQueries({ queryKey: ["products"] });
          router.push("/dashboard/categories");
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
            <Field orientation="responsive">
              <Field className="flex-1">
                <NameInput name={{ value: name, setValue: setName }} />
              </Field>
              <Field className="flex-1">
                <ParentInput
                  parentId={{ value: parentId, setValue: setParentId }}
                />
              </Field>
            </Field>
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
            <Link href={`/dashboard/categories`}>Cancel</Link>
          </Button>
          <Button disabled={isPending} type="submit">
            Create
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
