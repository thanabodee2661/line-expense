"use client";

import SelectMonth from "@/components/selectmonth";
import SelectYear from "@/components/selectyear";
import { DetailReport, DoughnutInterface } from "@/models/reports";
import { formatter } from "@/utils/formater";
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

export default function MonthsReports() {
  const form = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  };
  const [formSearch, setFormSearch] = useState(form);
  const [dataGraph, setDataGraph] = useState<DoughnutInterface | null>(null);
  const [total, setTotal] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [detailList, setDetailList] = useState<DetailReport[] | null>(null);

  const handleChangeYear = (value: number) => {
    setFormSearch({ ...formSearch, year: value });
  };
  const handleChangeMonth = (value: number) => {
    setFormSearch({ ...formSearch, month: value });
  };

  const search = () => {
    setIsLoading(true);
    axios
      .get(process.env.NEXT_PUBLIC_EXPENSE_URL || "", {
        params: {
          path: "reports",
          year: formSearch.year,
          month: formSearch.month,
        },
        headers: {
          "Content-Type": "text/plain;charset=utf-8;",
          Accept: "text/plain;charset=utf-8;",
        },
      })
      .then((resp) => {
        summarize(resp.data);
        detail(resp.data);
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

  const detail = (datas: Object) => {
    const tempReports = Object.entries(datas).map(([k, v]) => {
      return v
    }).flatMap(des => {
      return des.map((v: any[]) => {
        return { date: v[5], type: v[1], desc: v[2], amount: formatter.format(v[3]) };
      });
    });
    setDetailList(tempReports);
  };

  return (
    <div className="relative grid gap-4 w-full">
      <div className="relative grid w-full">
        <SelectYear
          deafultValue={formSearch.year}
          handleChange={handleChangeYear}
        ></SelectYear>
        <SelectMonth
          year={formSearch.year}
          deafultValue={formSearch.month}
          handleChange={handleChangeMonth}
        ></SelectMonth>
        <button className="btn btn-primary mt-4" onClick={search}>
          ค้นหา
        </button>
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
        <div className="relative w-full m-auto justify-center">
          <div role="tablist" className="tabs grid-cols-2 tabs-bordered">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="สรุป"
              defaultChecked
            />
            <div role="tabpanel" className="tab-content pt-4">
              <Doughnut data={dataGraph} />
              <div
                className="absolute text-center"
                style={{ width: '117px', top: '220px', left: '33%' }}
              >
                {total}
              </div>
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="รายละเอียด"
            />
            <div role="tabpanel" className="tab-content pt-4">
              <div className="overflow-x-auto h-96">
                <table className="table table-xs table-pin-rows ">
                  <thead>
                    <tr>
                      <th>วันที่</th>
                      <th>ประเภท</th>
                      <th>รายการ</th>
                      <th>จำนวน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailList?.map((v, i) => (
                      <tr key={`detailList${i}`}>
                        <td>{v.date}</td>
                        <td>{v.type}</td>
                        <td>{v.desc}</td>
                        <td className="text-right">{v.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan={3}>รวม</th>
                      <th className="text-right">{total}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
