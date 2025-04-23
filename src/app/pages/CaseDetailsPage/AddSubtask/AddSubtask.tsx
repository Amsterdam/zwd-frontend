import { Button, Row } from "@amsterdam/design-system-react"
import SubtaskDialog from "./SubtaskDialog/SubtaskDialog"
import { useDialog } from "app/hooks"

const AddSubtask: React.FC = () => {
  const dialogId = "ams-dialog-add-subtask"
  const { openDialog } = useDialog(dialogId)
  return (
    <Row align="end">
      <Button key="id-subtask-add" onClick={openDialog} variant="secondary">
        Extra taak opvoeren
      </Button>
      <SubtaskDialog id={dialogId} />
    </Row>
  )
}

export default AddSubtask
