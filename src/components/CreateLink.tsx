import { Button } from "@/components/ui/button";

export function CreateLink() {
  return (
    <div className="flex flex-col items-center justify-center gap-7">
      <h2 className="text-9xl font-bungee text-gray-light">$</h2>
      <p className="w-1/2 text-center text-base">
        Share expenses online, <strong>no downloads needed!</strong> Easily
        settle who owes what with ShareMoney.
      </p>
      <Button>Create Link</Button>
    </div>
  );
}
