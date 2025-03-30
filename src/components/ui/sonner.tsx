import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster"
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast:
            "group data-[type=success]:!bg-toast-green-light data-[type=error]:!bg-toast-red-light !border-none !shadow-sm !px-5 !py-3",
          icon: "group-data-[type=success]:[&>svg]:fill-toast-green-base group-data-[type=error]:[&>svg]:fill-toast-red-base [&>svg]:bg-transparent bg-transparent",
          content: "bg-transparent",
          title:
            "group-data-[type=success]:!text-toast-green-dark group-data-[type=error]:!text-toast-red-dark bg-transparent",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
