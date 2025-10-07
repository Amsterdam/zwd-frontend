import { Button, Row } from "@amsterdam/design-system-react"
import { PlusIcon } from "@amsterdam/design-system-react-icons"
import SubtaskDialog from "./SubtaskDialog/SubtaskDialog"
import { useDialog } from "app/hooks"

const AddSubtask: React.FC = () => {
  const dialogId = "ams-dialog-add-subtask"
  const { openDialog } = useDialog(dialogId)
  return (
    <Row align="end">
      <Button
        key="id-subtask-add"
        variant="secondary"
        icon={PlusIcon}
        iconBefore
        onClick={openDialog}
      >
        Extra taak opvoeren
      </Button>
      <SubtaskDialog id={dialogId} />
    </Row>
  )
}

export default AddSubtask
