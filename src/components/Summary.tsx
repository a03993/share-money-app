import { cn } from "@/lib/utils";

export function Summary({
  peopleCount,
  totalAmount,
  className,
  inSettlement,
}: {
  peopleCount: number;
  totalAmount: number;
  className?: string;
  inSettlement?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-10 font-normal", className)}>
      {!inSettlement && <h1 className="text-base text-xl">Summary</h1>}
      <div
        className={cn(
          "flex items-end justify-center md:justify-start",
          inSettlement && "md:justify-end"
        )}
      >
        <p className={cn("text-5xl", inSettlement && "text-2xl")}>
          {peopleCount}
        </p>
        <p className="text-xl">人</p>
        <p className="text-5xl">${totalAmount.toLocaleString()}</p>
      </div>
    </div>
  );
}
