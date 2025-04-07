import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster"
      position="bottom-right"
      style={{ bottom: "130px" }}
      toastOptions={{
        classNames: {
          toast:
            "group data-[type=success]:!bg-success-light data-[type=error]:!bg-error-light !border-none !shadow-sm !px-5 !py-3",
          icon: "group-data-[type=success]:[&>svg]:fill-success-base group-data-[type=error]:[&>svg]:fill-error-base [&>svg]:bg-transparent bg-transparent",
          content: "bg-transparent",
          title:
            "group-data-[type=success]:!text-success-dark group-data-[type=error]:!text-error-dark bg-transparent",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
