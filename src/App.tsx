import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateLink } from "@/components/CreateLink";
import { SplitTabs } from "@/components/SplitTabs";

type SplitData = typeof import("../db.json")["mockLink123"];

function App() {
  const [data, setData] = useState<SplitData | null>(null);
  const [linkId, setLinkId] = useState<string | null>(null);

  // Prevent linkId from disappearing when refreshing
  useEffect(() => {
    const path = window.location.pathname.slice(1);
    if (path) {
      setLinkId(path);
    }
  }, []);

  // If linkId changes, fetch data
  useEffect(() => {
    if (linkId) {
      fetch("/db.json")
        .then((res) => res.json())
        .then((json) => setData(json[linkId]))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [linkId]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateLink setLinkId={setLinkId} />} />
        {data && linkId && (
          <Route path={`/${linkId}`} element={<SplitTabs data={data} />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
