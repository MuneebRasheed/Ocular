import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },

    backgroundColor: "red",
  },
};

const labels = ["9am", "8am", "5pm", "3am", "9am", "1pm", "2pm"];

export const data = {
  labels,
  datasets: [
    {
      data: [20, 500, 30, 40, 299],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    // {
    //   label: "Dataset 2",
    //   data: [20, 500, 30, 40, 299],
    //   backgroundColor: "rgba(53, 162, 235, 0.5)",
    // },
  ],
};
function NewChart({ datas, title }) {
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: datas,
        backgroundColor: datas.map((item, index) =>
          index % 2 === 0 ? "#79FE0C" : index % 3 === 0 ? "#FF7B19" : "#FF2226"
        ),
      },
      // {
      //   label: "Dataset 2",
      //   data: [20, 500, 30, 40, 299],
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  return <Bar options={options} data={data} />;
}

export default NewChart;
