import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { CreateLinkPage } from "@/pages/CreateLinkPage";
import { LinkPage } from "@/pages/LinkPage";

import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isLinkPage = /^\/[^/]+$/.test(location.pathname);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="md:min-h-screen">
        <Routes>
          <Route path="/" element={<CreateLinkPage />} />
          <Route path={`/:linkId`} element={<LinkPage />} />
        </Routes>
      </div>
      {isLinkPage && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
