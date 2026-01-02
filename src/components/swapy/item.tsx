import { cn } from "@/lib/utils";

export function Item({ key }: { key: string }) {
  return (
    <div className={cn("swapy-highlighted:col-span-3")} data-swapy-item={key}>
      item
    </div>
  );
}
