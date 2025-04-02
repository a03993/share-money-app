interface NoDataMessageProps {
  title: string;
  description: string;
  className?: string;
}

export const NoDataMessage = ({
  title,
  description,
  className,
}: NoDataMessageProps) => {
  return (
    <div
      className={`flex items-center w-full bg-gray-lighter p-4 flex-1 ${className}`}
    >
      <div className="flex flex-col text-base">
        <p className="text-gray-dark">{title}</p>
        <p className="font-light text-gray-dark">{description}</p>
      </div>
    </div>
  );
};
