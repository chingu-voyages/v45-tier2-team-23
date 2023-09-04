import { useState } from "react";
import Map from "./Map";
import BarChart from "./BarChart";

const Display = ({ results }) => {
  const [graphicDisplay, setGraphicDisplay] = useState("map");

  return (
    <div className="flex-auto">
      <div className="flex gap-3 justify-center">
        <button
          className="border w-48 border-slate-700 bg-slate-100 test-slate-300 text-slate-700 p-1 hover:bg-slate-700 hover:text-slate-100"
          onClick={() => setGraphicDisplay("map")}
        >
          Map
        </button>
        <button
          className="border w-48 border-slate-700 bg-slate-100 test-slate-300 text-slate-700 p-1 hover:bg-slate-700 hover:text-slate-100"
          onClick={() => setGraphicDisplay("graph")}
        >
          Bar Graph
        </button>
      </div>
      {graphicDisplay === "map" && <Map />}
      {graphicDisplay === "graph" && <BarChart results={results} />}
    </div>
  );
};

export default Display;
