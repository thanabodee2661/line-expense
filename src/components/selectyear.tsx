import { useEffect } from "react";

const SelectYear: React.FC<{ deafultValue: number, handleChange: (year: number) => void }> = ({ deafultValue, handleChange }) => {
  const now = new Date()
  let yearList = []

  for (let year = 2023; year <= now.getFullYear(); year++) {
    yearList.push(year)
  }

  yearList = yearList.sort((a, b) => b - a)

  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">ปี</span>
      </div>
      <select className="select select-bordered" onChange={(e) => handleChange(+e.target.value)} value={deafultValue}>
      <option value="">-</option>
        {yearList.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
    </label>
  );
}


export default SelectYear;