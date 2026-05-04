"use client";

import ActiveSwitch from "@/app/(dashboard)/dashboard/products/create/_components/form/active-switch";
import InputGender from "@/app/(dashboard)/dashboard/products/create/_components/form/gender";
import TagInput from "@/app/(dashboard)/dashboard/products/create/_components/form/tag";
import {
  DescriptionInput,
  NameInput,
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
import { Input } from "@/components/ui/input";
import { Gender } from "@/fromServer/generated/prisma";
import { ImagePlus, PencilEdit01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [tags, setTags] = useState<string[]>([]);
  const [gender, setGender] = useState<Gender>("UNISEX");
  const [publish, setPublish] = useState<boolean>(true);
  const [media, setMedia] = useState<string[]>([]);

  return (
    <form className="grid md:h-full md:grid-rows-[1fr_auto] grid-cols-1 md:grid-cols-2 gap-4">
      <FieldGroup className="p-4 border border-primary/5 rounded-xl">
        <FieldSet className="h-full flex flex-col justify-start items-stretch">
          <FieldLegend className="flex justify-center items-center gap-2">
            <HugeiconsIcon icon={PencilEdit01FreeIcons} /> Information
          </FieldLegend>
          <FieldDescription></FieldDescription>
          <FieldGroup className="flex-1 flex flex-col justify-start items-stretch">
            <Field orientation="vertical">
              <NameInput name={{ value: name, setValue: setName }} />
              <Field className="flex-1">
                <FieldLabel htmlFor="product-base-price">
                  Product Base Price
                </FieldLabel>
                <Input
                  id="product-base-price"
                  type="number"
                  placeholder="e.g 100 (in dollar)"
                  required
                />
              </Field>
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
          <Button variant="secondary" asChild>
            <Link href={`/dashboard/products`}>Cancel</Link>
          </Button>
          <Button type="submit">Create</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
