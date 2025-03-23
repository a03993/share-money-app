import { cn } from "@/lib/utils";

export function Summary({
  peopleCount = 4,
  totalAmount = 2000,
  className,
}: {
  peopleCount?: number;
  totalAmount?: number;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-base font-medium">Summary</h1>
      <div className="flex items-end">
        <p className={cn("text-5xl font-medium", className)}>{peopleCount}</p>
        <p className="text-xl">人</p>
        <p className="text-5xl font-medium">${totalAmount.toLocaleString()}</p>
      </div>
    </div>
  );
}
