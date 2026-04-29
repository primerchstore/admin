import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

export function PageBreadcrumb({ pathname }: { pathname: string }) {
  const urls = pathname.split("/");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {urls.map((item: string, index: number) => {
          if (item !== "")
            return (
              <Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <span className="capitalize">{item.replace("-", " ")}</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator
                  className={cn("", urls.length - 1 === index && "hidden")}
                />
              </Fragment>
            );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
