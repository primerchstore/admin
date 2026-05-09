import { Badge } from "@/components/ui/badge";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { X } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";

export default function TagInput({
  tags,
}: {
  tags: { setValue: Dispatch<SetStateAction<string[]>>; value: string[] };
}) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    const trimmed = tag.trim().toLowerCase();
    if (!trimmed) return;
    if (tags?.value.includes(trimmed)) return;
    tags?.setValue?.([...tags.value, trimmed]);
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    tags?.setValue?.(tags.value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    }

    if (e.key === "Backspace" && !inputValue && tags?.value.length > 0) {
      removeTag(tags?.value[tags.value.length - 1]);
    }
  };

  return (
    <Field>
      <FieldLabel htmlFor="product-tags">Product Tags</FieldLabel>
      <FieldDescription>Enter to new tag</FieldDescription>
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex flex-wrap gap-2 items-center min-h-10 w-full rounded-md border border-input bg-background px-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      >
        {tags.value.map((tag) => (
          <Badge key={tag} variant="secondary" className="gap-1 pr-1">
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              className="rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors"
            >
              <HugeiconsIcon icon={X} size={14} />
            </button>
          </Badge>
        ))}

        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(inputValue)}
          placeholder={tags.value.length === 0 ? "Best seller..." : ""}
          className="flex-1 min-w-30 border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
        />
      </div>
    </Field>
  );
}
