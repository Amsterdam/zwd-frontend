import { Button } from "@amsterdam/design-system-react"
import { DownloadIcon } from "@amsterdam/design-system-react-icons"
import { useCase, useHomeownerAssociation } from "app/state/rest"
import createPdf from "./createPdf"

export const DownloadPdf: React.FC<{
  caseId: Components.Schemas.Case["id"]
}> = ({ caseId }) => {
  const [caseData] = useCase(caseId)
  const hoaId = caseData?.homeowner_association?.id
  const [hoaData] = useHomeownerAssociation(hoaId)
  return (
    caseData &&
    hoaData && (
      <Button
        icon={DownloadIcon}
        variant="secondary"
        onClick={() => createPdf(caseData, hoaData)}
      >
        Download PDF
      </Button>
    )
  )
}

export default DownloadPdf
