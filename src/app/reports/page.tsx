"use client"
import { useRouter } from 'next/navigation'

export default function Reports() {
  const router = useRouter()
  return (
    <div className="grid gap-3 w-full mt-6">
      <div className="card bg-blue-400 shadow-xl" onClick={() => router.push(`./reports/years`)}>
        <div className="card-body">
          <h2 className="card-title">รายงานรายปี</h2>
        </div>
      </div>
      <div className="card bg-green-400 shadow-xl" onClick={() => router.push(`./reports/months`)}>
        <div className="card-body">
          <h2 className="card-title">รายงานรายเดือน</h2>
        </div>
      </div>
    </div>
  );
}
