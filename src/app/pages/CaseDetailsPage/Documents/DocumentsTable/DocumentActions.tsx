import { IconButton, Row } from "@amsterdam/design-system-react"
import { DownloadIcon,CloseIcon } from "@amsterdam/design-system-react-icons"
import { ViewSvg } from "app/components"
import { useCaseDocumentDownload } from "app/state/rest"
import { downloadFile, viewFile } from "app/utils/files"


type Props = {
  record: Components.Schemas.CaseDocument
}

type ResponseFile = {
  data: BlobPart
}

const DoucumentsActions: React.FC<Props> = ({ record }) => {
  const [, { execGet }] = useCaseDocumentDownload(record.case, record.id)

  const handleAction = (isDownload = false) => {
    execGet()
      .then((resp) => {
        const data = (resp as ResponseFile)?.data
        if (isDownload) {
          downloadFile(data, record.name)
        } else {
          viewFile(data)
        }
      })
      .catch((error) => {
        console.error("Error downloading document", error)  
      }) 
  }

  return (
    <Row align="between">
      <IconButton
        label="Bekijken"
        svg={ ViewSvg }
        onClick={() => handleAction() }
      />
      <IconButton
        label="Downloaden"
        svg={ DownloadIcon }
        onClick={() => handleAction(true) }
      />
      <IconButton
        label="Verwijderen"
        svg={ CloseIcon }
      />
    </Row>
  )
}

export default DoucumentsActions
