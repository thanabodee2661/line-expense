import MonthUtil from "@/utils/month";
import { useEffect, useState } from "react";

interface MonthInterface {
  id: number
  name: string
}

const SelectMonth: React.FC<{ year?: number, deafultValue: number, handleChange: (month: number) => void }> = ({ year, deafultValue, handleChange }) => {
  const now = new Date()

  const [monthList, setMonthList] = useState<MonthInterface[]>([])

  useEffect(() => {
    let monthList = []
    const limitMonth = (!year || year == now.getFullYear()) ? now.getMonth() + 1 : 12
    for (let month = 1; month <= limitMonth; month++) {
      const id = month
      const name = MonthUtil[('0' + month).slice(-2) as keyof typeof MonthUtil].full
      monthList.push({id: id, name: name});
    }
  
    setMonthList(monthList)
  }, [year])

  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">เดือน</span>
      </div>
      <select className="select select-bordered" onChange={(e) => handleChange(+e.target.value)} value={deafultValue}>
      <option value="">-</option>
        {monthList.map(v => (
          <option key={v.id} value={v.id}>{v.name}</option>
        ))}
      </select>
    </label>
  );
}


export default SelectMonth;