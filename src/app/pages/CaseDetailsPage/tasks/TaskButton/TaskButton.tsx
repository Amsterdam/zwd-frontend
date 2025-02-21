import { LinkButton } from "app/components"
import { useDialog } from "app/hooks"
import FormDialog from "../FormDialog/FormDialog"

type Props = {
  task: CustomCaseUserTask
  caseId: Components.Schemas.Case["id"]
}

export const TaskButton: React.FC<Props> = ({ task, caseId }) => {
  const dialogId = `id-${task.id}`
  const { openDialog, closeDialog } = useDialog(dialogId)

  return (
    <>
      <LinkButton label="Taak afronden" onClick={openDialog} />
      <FormDialog
        dialogId={dialogId}
        task={task}
        caseId={caseId}
        closeDialog={closeDialog}
      />
    </>
  )
}

export default TaskButton
