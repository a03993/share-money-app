import { CreateLink } from "@/components/CreateLink";
import { LinkPage } from "@/components/LinkPage";
import { Toaster } from "@/components/ui/sonner";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CreateLink />} />
        <Route path={`/:linkId`} element={<LinkPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
