import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useProductPageStore } from "@/stores/product.page.store";
import { useSizePageStore } from "@/stores/size.page.store";
import { ArrowLeft, ArrowRight, Image01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function ProductPagination() {
  const { hasNext, hasPrev, page, setPage, totalItems, totalPage } =
    useProductPageStore();

  const handlePrev = () => {
    if (hasPrev) setPage(page - 1);
  };
  const handleNext = () => {
    if (hasNext) setPage(page + 1);
  };

  return (
    <div className="w-full flex justify-between items-center">
      <Button>
        <HugeiconsIcon icon={Image01Icon} />
        {totalItems} Total items
      </Button>
      <ButtonGroup>
        <Button
          onClick={handlePrev}
          disabled={!hasPrev}
          size="icon"
          aria-label="Previews Page"
        >
          <HugeiconsIcon icon={ArrowLeft} />
        </Button>
        <Button>
          Page {page} of {totalPage}
        </Button>
        <Button
          onClick={handleNext}
          disabled={!hasNext}
          size="icon"
          aria-label="Next Page"
        >
          <HugeiconsIcon icon={ArrowRight} />
        </Button>
      </ButtonGroup>
    </div>
  );
}
