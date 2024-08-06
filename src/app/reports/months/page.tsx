"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Title, Tooltip, Legend, Filler, Colors);

export default function MonthsReports() {
  // X - axis lable
  const labels = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug"];

  // Data want to show on chart
  const datasets = [[1,2,3],[4,5,6]];

  const data = {
    labels: labels,
    datasets: [
      {
        // Title of Graph
        label: "My First Dataset",
        data: datasets,
      },
      // insert similar in dataset object for making multi line chart
    ],
  };

  return (
    <div className="relative grid gap-4 w-full">
      <div className="relative grid w-full">
        <label className="form-control">
          <div className="label">
            <span className="label-text">ปี</span>
          </div>
          <select className="select select-bordered">
            <option>2024</option>
          </select>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">เดือน</span>
          </div>
          <select className="select select-bordered">
            <option>มกราคม</option>
            <option>กุมภาพัน</option>
            <option>มีนาคม</option>
          </select>
        </label>
        <button className="btn btn-primary mt-4">ค้นหา</button>
      </div>

      <div className="relative w-full m-auto">
        <Doughnut data={data} />
      </div>
    </div>
  );
}
