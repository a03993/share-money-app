import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

import { BASE_URL } from "@/lib/constants";

export function CreateLink() {
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
      toast.error("Failed to create link");
    }
  };

  return (
    <Tabs defaultValue="createLink">
      <TabsList className="relative">
        <TabsTrigger
          value="createLink"
          className="text-2xl text-black font-black opacity-100 absolute sm:relative sm:left-0 left-7"
        >
          ShareMoney
        </TabsTrigger>
      </TabsList>
      <TabsContent value="createLink" className="mt-25">
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
