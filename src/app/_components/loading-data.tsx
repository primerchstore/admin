import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function LoadingData() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Button size="sm">
        <Spinner data-icon="inline-start" />
        Loading...
      </Button>
    </div>
  );
}
