import { useState } from "react";
import Map from "./Map";
import BarChart from "./BarChart";

export default function Display({ results, hoveredRow }) {
  const [graphicDisplay, setGraphicDisplay] = useState("map");

  return (
    <div className="flex-auto">
      <div className="flex justify-center bg-gray-200 w-96 mx-auto p-2 gap-2 rounded-lg">
        <button
          className={`w-48 rounded-lg p-2 transition duration-900 ease-in-out ${
            graphicDisplay === "map"
              ? "bg-accent text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setGraphicDisplay("map")}
        >
          Map
        </button>
        <button
          className={`w-48 rounded-lg p-2 transition duration-900 ease-in-out ${
            graphicDisplay === "graph"
              ? "bg-accent text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setGraphicDisplay("graph")}
        >
          Bar Graph
        </button>
      </div>
      {graphicDisplay === "map" && <Map results={results} hoveredRow={hoveredRow} />}
      {graphicDisplay === "graph" && <BarChart results={results} />}
    </div>
  );
}
