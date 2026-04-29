import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import Link from "next/link";

export default function EmptyData({
  title,
  icon,
  url,
}: {
  title: string;
  icon?: IconSvgElement;
  url?: string;
}) {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Empty>
        <EmptyHeader>
          {icon && (
            <EmptyMedia variant="icon">
              <HugeiconsIcon icon={icon} />
            </EmptyMedia>
          )}
          <EmptyTitle>No {title} found</EmptyTitle>
          <EmptyDescription>
            Add {title} by click button bellow, or button top right
          </EmptyDescription>
        </EmptyHeader>
        {url && (
          <EmptyContent>
            <Button asChild>
              <Link href={url}>
                <HugeiconsIcon icon={Plus} /> Add {title}
              </Link>
            </Button>
          </EmptyContent>
        )}
      </Empty>
    </div>
  );
}
