import { CreateLink } from "@/components/CreateLink";
import { SplitTabs } from "@/components/SplitTabs";
import { Toaster } from "@/components/ui/sonner";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CreateLink />} />
        <Route path={`/:linkId`} element={<SplitTabs />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
