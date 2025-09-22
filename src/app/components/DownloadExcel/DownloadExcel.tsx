import { useContext } from "react"
import { Button } from "@amsterdam/design-system-react"
import { DownloadIcon } from "@amsterdam/design-system-react-icons"
import { saveAs } from "file-saver"
import { ContextValues } from "app/state/context/ValueProvider"
import { createExcel } from "./createExcel"

const CASES = "cases"

export const DownloadExcel = () => {
  const { results } = useContext(ContextValues)[CASES]

  const downloadFile = async () => {
    const workbook = createExcel(results)
    const buffer = await workbook.xlsx.writeBuffer()

    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    })
    saveAs(blob, "ZWD-Zaken.xlsx")
  }

  return (
    <Button
      id="export-excel-button"
      variant="secondary"
      icon={DownloadIcon}
      iconBefore
      onClick={downloadFile}
    >
      Download Excel
    </Button>
  )
}

export default DownloadExcel
