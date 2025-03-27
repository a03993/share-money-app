interface SplitAmountProps {
  peopleCount: number;
  totalAmount: number;
}

export function SplitAmount({ peopleCount, totalAmount }: SplitAmountProps) {
  return (
    <div className="flex items-end justify-center md:justify-start">
      <p className="text-5xl">
        ${Math.ceil(totalAmount / peopleCount).toLocaleString()}
      </p>
      <p className="text-xl">/人</p>
    </div>
  );
}
