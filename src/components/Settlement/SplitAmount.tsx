export function SplitAmount({ peopleCount = 4, totalAmount = 2000 }) {
  return (
    <div className="flex items-end justify-center md:justify-start">
      <p className="text-5xl">
        ${(totalAmount / peopleCount).toLocaleString()}
      </p>
      <p className="text-xl">/人</p>
    </div>
  );
}
