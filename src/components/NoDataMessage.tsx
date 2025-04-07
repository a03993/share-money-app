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
      className={`flex w-full max-w-80 md:max-w-none bg-gray-lighter p-4 text-base text-gray-dark rounded-md shadow-sm ${className}`}
    >
      <div className="flex flex-col ">
        <p>{title}</p>
        <p className="font-light">{description}</p>
      </div>
    </div>
  );
};
