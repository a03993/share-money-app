import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CreateLink({
  setLinkId,
}: {
  setLinkId: (linkId: string) => void;
}) {
  const navigate = useNavigate();

  const handleCreateLink = () => {
    const newLinkId = "mockLink123"; // TODO: This should be dynamically fetched from the backend
    setLinkId(newLinkId);
    navigate(`/${newLinkId}`);
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
