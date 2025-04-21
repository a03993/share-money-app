import { CreateLink } from "@/components/CreateLink";
import Footer from "@/components/Footer";
import { LinkPage } from "@/components/LinkPage";
import { Toaster } from "@/components/ui/sonner";

import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isLinkPage = /^\/[^/]+$/.test(location.pathname);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="md:min-h-screen pt-10 pb-40">
        <Routes>
          <Route path="/" element={<CreateLink />} />
          <Route path={`/:linkId`} element={<LinkPage />} />
        </Routes>
      </div>
      {isLinkPage && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
