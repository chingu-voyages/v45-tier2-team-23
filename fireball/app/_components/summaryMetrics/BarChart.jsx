import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

export default function BarChart({ results }) {
  const [chartType, setChartType] = useState("year");

  // Bar chart - year
  const yearCounts = {};
  results.forEach((nasaObj) => {
    const year = new Date(nasaObj.year).getFullYear();
    yearCounts[year] = (yearCounts[year] || 0) + 1;
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Strikes",
        },
      },
    },
  };

  const chartData = {
    labels: Object.keys(yearCounts),
    datasets: [
      {
        label: "Meteorite Strikes",
        data: Object.values(yearCounts),
        backgroundColor: "#77042b",
      },
    ],
  };

  //Bar chart - composition (recclass)
  const recclassCounts = {};
  results.forEach((item) => {
    const recclass = item.recclass;
    recclassCounts[recclass] = (recclassCounts[recclass] || 0) + 1;
  });

  const chartOptionsRecclass = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Recclass",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Strikes",
        },
      },
    },
  };

  const chartDataRecclass = {
    labels: Object.keys(recclassCounts),
    datasets: [
      {
        label: "Meteorite Strikes",
        data: Object.values(recclassCounts),
        backgroundColor: "#77042b",
      },
    ],
  };

  return (
    <div className="mt-4">
      <div
        className={`graph-container ${
          chartType === "composition" ? "hidden" : ""
        }`}
      >
        <Bar data={chartData} options={chartOptions} className="canvas" />
      </div>
      <div
        className={`graph-container ${chartType === "year" ? "hidden" : ""}`}
      >
        <Bar
          data={chartDataRecclass}
          options={chartOptionsRecclass}
          className="canvas"
        />
      </div>
      <form className="flex items-center justify-center gap-2 mt-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="option"
            value="year"
            checked={chartType === "year"} // Check based on chartType value
            onChange={() => setChartType("year")}
            className="me-2"
          />
          Year
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="option"
            value="composition"
            checked={chartType === "composition"} // Check based on chartType value
            onChange={() => setChartType("composition")}
            className="me-2"
          />
          Composition
        </label>
      </form>
    </div>
  );
}
