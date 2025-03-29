import { Routes, Route } from "react-router-dom";
import { CreateLink } from "@/components/CreateLink";
import { SplitTabs } from "@/components/SplitTabs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateLink />} />
      <Route path={`/:linkId`} element={<SplitTabs />} />
    </Routes>
  );
}

export default App;
