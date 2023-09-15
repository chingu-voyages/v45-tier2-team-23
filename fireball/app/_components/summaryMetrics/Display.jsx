import { useState, useRef } from "react";
import Map from "./Map";
import BarChart from "./BarChart";

export default function Display({ results, selectedRow }) {
  const [graphicDisplay, setGraphicDisplay] = useState("map");
  const {current: unfilteredResults} = useRef(results)

  return (
    <div className="flex-auto">
      <div className="flex flex-col sm:flex-row items-center sm:justify-center bg-gray-200 sm:w-96 mx-auto p-2 gap-2 rounded-lg">
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
      {graphicDisplay === "map" && <Map results={results} selectedRow={selectedRow} unfilteredResults={unfilteredResults} />}
      {graphicDisplay === "graph" && <BarChart results={results} />}
    </div>
  );
}
