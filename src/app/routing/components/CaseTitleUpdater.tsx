import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useCase } from "app/state/rest"
import { env } from "app/config/env"

const CaseTitleUpdater: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>()
  const [data, { isBusy }] = useCase(Number(caseId) || undefined)

  useEffect(() => {
    if (!isBusy && data) {
      document.title = `${data.prefixed_dossier_id} | ZWD`
    } else {
      document.title = `${env.VITE_APP_TITLE}`
    }
  }, [data, isBusy])

  return null
}

export default CaseTitleUpdater
