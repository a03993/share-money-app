import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BASE_URL } from "@/lib/constants";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

export function CreateLinkPage() {
  const navigate = useNavigate();

  const handleCreateLink = async () => {
    try {
      const res = await fetch(`${BASE_URL}/links`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to create link");
      }

      const data = await res.json();
      const newLinkId = data.linkId;

      toast.success("Link generated successfully");
      navigate(`/${newLinkId}`);
    } catch (error) {
      console.error("Error creating link:", error);
      toast.error("Failed to create link, please try again.");
    }
  };

  return (
    <Tabs defaultValue="createLink">
      <TabsList className="justify-start">
        <TabsTrigger value="createLink" isLogo>
          ShareMoney
        </TabsTrigger>
      </TabsList>
      <TabsContent value="createLink" className="mt-40">
        <div className="flex flex-col items-center justify-center gap-7">
          <h2 className="text-9xl font-bungee text-gray-light">$</h2>
          <p className="w-1/2 text-center text-base">
            Share expenses online, <strong>no downloads needed!</strong> Easily
            settle who owes what with ShareMoney.
          </p>
          <Button onClick={handleCreateLink}>Create Link</Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
