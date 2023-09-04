import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import Chart from "chart.js/auto";

function BarChart({ results }) {
  const [chartType, setChartType] = useState("year");

  const customStyles = {
    canvas: {
      width: "100%", // Use 100% width to fill the parent container
      height: "auto", // Allow the height to adjust based on content
    },
  };

  // Bar chart - year
  const yearCounts = {};
  results.forEach((nasaObj) => {
    const year = new Date(nasaObj.year).getFullYear();
    yearCounts[year] = (yearCounts[year] || 0) + 1;
  });

  const chartOptions = {
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
      },
    ],
  };

  return (
    <div>
      <div className={`${chartType === "composition" ? "hidden" : ""}`}>
        <Bar data={chartData} options={chartOptions} className="w-100" />
      </div>
      <div className={`${chartType === "year" ? "hidden" : ""}`}>
        <Bar
          data={chartDataRecclass}
          options={chartOptionsRecclass}
          className="w-100"
        />
      </div>
      <form className="flex items-center justify-center gap-2">
        <label>
          <input
            type="radio"
            name="option"
            value="year"
            checked={chartType === "year"} // Check based on chartType value
            onChange={() => setChartType("year")}
          />
          Year
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value="composition"
            checked={chartType === "composition"} // Check based on chartType value
            onChange={() => setChartType("composition")}
          />
          Composition (Recclass)
        </label>
      </form>
    </div>
  );
}

export default BarChart;