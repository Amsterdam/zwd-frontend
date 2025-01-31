import { Icon } from "@amsterdam/design-system-react"
import { AlertIcon } from "@amsterdam/design-system-react-icons"
import { useDecodedToken } from "app/hooks"

type Props = {
  task: Components.Schemas.CaseUserTask
  children: React.ReactNode | React.ReactNode[]
  displayMode?: "text" | "icon"
}

export const TaskReviewGuard: React.FC<Props> = ({
  task,
  children,
  displayMode = "text"
}) => {
  const decodedToken = useDecodedToken()
  if (!decodedToken) return null
  const requiresReviewer =
    !!task?.requires_review && task?.initiated_by === decodedToken?.unique_name

  if (requiresReviewer) {
    return displayMode === "icon" ? (
      <Icon svg={AlertIcon} style={{ color: "#FF9100" }} />
    ) : (
      <span>Deze taak moet door iemand anders worden afgerond</span>
    )
  }
  return <>{children}</>
}

export default TaskReviewGuard
