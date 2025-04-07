import { Button } from "@/components/ui/button";

import { toast } from "sonner";

export default function Footer() {
  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy link, please copy manually.");
      });
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-gray-lighter p-5 h-30">
      <div className="flex flex-col items-center justify-center gap-2 text-sm">
        <p className="text-black">
          Click below to copy the link and send to your debtors.
        </p>
        <Button variant="link" onClick={handleCopyLink}>
          <span className="max-w-80 md:max-w-none truncate">{currentUrl}</span>
        </Button>
      </div>
    </footer>
  );
}
