import { useState, useEffect } from "react";
import { SiteNavigator } from "@/components/SiteNavigator";

type SplitData = typeof import("../db.json")["mockLink123"];

function App() {
  const [data, setData] = useState<SplitData | null>(null);
  const linkId = "mockLink123";

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((json) => setData(json[linkId]));
  }, []);

  if (!data) return <div>載入中或找不到資料</div>;

  return (
    <>
      <SiteNavigator data={data} />
    </>
  );
}

export default App;
