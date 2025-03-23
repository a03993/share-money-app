export function SplitAmount({ peopleCount = 4, totalAmount = 2000 }) {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-base font-medium">Split Amount</h1>
      <div className="flex items-end">
        <p className="text-5xl font-medium">
          ${(totalAmount / peopleCount).toLocaleString()}
        </p>
        <p className="text-xl">/{peopleCount}人</p>
      </div>
    </div>
  );
}
