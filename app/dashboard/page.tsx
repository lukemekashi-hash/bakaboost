import { DonationsDataTable } from "./donations-table"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DonationsDataTable />
    </Suspense>
  )
}
