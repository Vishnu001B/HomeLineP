// LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const LineChart = () => {
  // Data for the chart
  const data = {
    labels: ["Trucks", "2 Wheeler", "Packers & Movers", "All India Parcel"], // X-axis labels
    datasets: [
      {
        label: "Karnataka",
        data: [100, 150, 200, 300], // Y-axis data for Karnataka
        borderColor: "rgba(54, 162, 235, 1)", // Blue line color
        fill: false,
        tension: 0.3, // Curvature of the line
      },
      {
        label: "Maharashtra",
        data: [200, 250, 180, 350], // Y-axis data for Maharashtra
        borderColor: "rgba(255, 206, 86, 1)", // Yellow line color
        fill: false,
        tension: 0.3,
      },
      {
        label: "Tamil Nadu",
        data: [150, 100, 250, 200], // Y-axis data for Tamil Nadu
        borderColor: "rgba(75, 192, 192, 1)", // Green line color
        fill: false,
        tension: 0.3,
      },
    ],
  };

  // Chart options for customizing appearance
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top", // Position of the legend
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-5">
      <h2 className="text-xl font-bold mb-4">Revenue Generated</h2>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
