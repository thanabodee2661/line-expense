"use client";

import SelectYear from "@/components/selectyear";
import { DoughnutInterface } from "@/models/reports";
import { formatter } from "@/utils/formater";
import MonthUtil from "@/utils/month";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
} from "chart.js";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Title, Tooltip, Legend, Filler, Colors);

export default function YearsReports() {
  const form = {
    year: new Date().getFullYear(),
  };
  const [formSearch, setFormSearch] = useState(form);
  const [dataGraph, setDataGraph] = useState<DoughnutInterface | null>(null);
  const [total, setTotal] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeYear = (value: number) => {
    setFormSearch({ ...formSearch, year: value });
  };

  const search = () => {
    setIsLoading(true);
    axios
      .get(process.env.NEXT_PUBLIC_EXPENSE_URL || "", {
        params: {
          path: "reports",
          year: formSearch.year,
        },
        headers: {
          "Content-Type": "text/plain;charset=utf-8;",
          Accept: "text/plain;charset=utf-8;",
        },
      })
      .then((resp) => {
        summarizePerMonth(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const summarizePerMonth = (datas: Object) => {
    const tempReports = Object.entries(datas).map(([k, v]) => {
      const monthStr = k.split("/")[1];
      const monthFull = MonthUtil[monthStr as keyof typeof MonthUtil]?.full;
      const monthColor = MonthUtil[monthStr as keyof typeof MonthUtil]?.color;
      const summaryIncome = v.reduce((acc: number, cv: any) => {
        if (cv[1] == "รับ") {
          acc += cv[3];
        }
        return acc;
      }, 0);
      const summaryExpense = v.reduce((acc: number, cv: any) => {
        if (cv[1] == "จ่าย") {
          acc += cv[3];
        }
        return acc;
      }, 0);
      const remaining = summaryIncome - summaryExpense;
      return {
        month: monthFull,
        income: summaryIncome,
        expense: summaryExpense,
        remaining: remaining,
        color: monthColor,
      };
    });

    console.log(tempReports);

    const labels = tempReports.map((v) => v.month);
    const datasets = tempReports.map((v) => v.remaining.toFixed(2));
    const colors = tempReports.map((v) => v.color);
    const total = tempReports.reduce((acc, v) => (acc += v.remaining), 0);

    const data: DoughnutInterface = {
      labels: labels,
      datasets: [
        {
          label: "",
          data: datasets,
          backgroundColor: colors,
        },
      ],
    };

    setDataGraph(data);
    setTotal(formatter.format(total));
  };

  return (
    <div className="relative grid gap-4 w-full">
      <div className="relative grid w-full">
        <SelectYear
          deafultValue={formSearch.year}
          handleChange={handleChangeYear}
        ></SelectYear>
        <button className="btn btn-primary mt-4" onClick={search}>
          ค้นหา
        </button>
      </div>

      {
        isLoading ? (
          <div className="flex justify-center mt-5">
            <span className="loading loading-ring loading-lg"></span>
            <span className="loading loading-ring loading-lg"></span>
            <span className="loading loading-ring loading-lg"></span>
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : (
          !dataGraph ? (
              ""
            ) : (
              <div className="relative flex w-full m-auto justify-center">
                <Doughnut data={dataGraph} />
                <div
                  className="absolute text-center"
                  style={{ width: "117px", top: "195px" }}
                >
                  {total}
                </div>
              </div>
            )
        )
      }
    </div>
  );
}
