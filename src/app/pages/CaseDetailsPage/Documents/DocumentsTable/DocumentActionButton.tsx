import { JSX, useMemo, useState } from "react"
import { IconButton } from "@amsterdam/design-system-react"
import { useFetchFile } from "app/utils/files"
import { makeApiUrl } from "app/state/rest/hooks/utils"
import { Spinner } from "app/components"

type Props = {
  record: Components.Schemas.CaseDocument
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  label: string
  onFile: (file: Blob) => void
}

const DocumentActionButton: React.FC<Props> = ({
  record,
  icon,
  label,
  onFile
}) => {
  const fileUrl = useMemo(
    () => makeApiUrl("cases", record.case, "documents", "download", record.id),
    [record.case, record.id]
  )
  const fetchFile = useFetchFile(fileUrl)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const file = await fetchFile()
      onFile(file)
    } finally {
      setLoading(false)
    }
  }

  return loading ? (
    <div style={{ width: "25.6px", display: "flex", justifyContent: "center" }}>
      <Spinner color="#004699" size={18} />
    </div>
  ) : (
    <IconButton label={label} title={label} svg={icon} onClick={handleClick} />
  )
}

export default DocumentActionButton
