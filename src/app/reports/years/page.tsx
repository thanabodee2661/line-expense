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
        summarize(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const summarize = (datas: Object) => {
    const tempReports = Object.entries(datas).map(([k, v]) => {
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
        income: summaryIncome,
        expense: summaryExpense,
        remaining: remaining,
      };
    });

    const labels = ["รับ", "จ่าย", "เหลือ"];
    const income = tempReports.reduce((acc, v) => (acc += v.income), 0);
    const expense = tempReports.reduce((acc, v) => (acc += v.expense), 0);
    const remaining = tempReports.reduce((acc, v) => (acc += v.remaining), 0);
    const datasets = [
      income.toFixed(2),
      expense.toFixed(2),
      remaining.toFixed(2),
    ];
    const total = tempReports.reduce((acc, v) => (acc += v.remaining), 0);
    const backgroundColor = ["#00c200", "#f41c11", "#ecf00c"];

    const data: DoughnutInterface = {
      labels: labels,
      datasets: [
        {
          label: "",
          data: datasets,
          backgroundColor: backgroundColor,
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
        {!isLoading ? (
          <button className="btn btn-primary mt-4" onClick={search}>
            ค้นหา
          </button>
        ) : (
          ""
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-5">
          <span className="loading loading-ring loading-lg"></span>
          <span className="loading loading-ring loading-lg"></span>
          <span className="loading loading-ring loading-lg"></span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : !dataGraph ? (
        ""
      ) : (
        <div className="relative flex w-full m-auto justify-center">
          <Doughnut data={dataGraph} />
          <div
            className="absolute text-center"
            style={{ width: "117px", top: "175px" }}
          >
            {total}
          </div>
        </div>
      )}
    </div>
  );
}
