import { Button } from "@amsterdam/design-system-react"
import { useModal } from "app/components"
import FormModal from "../FormModal/FormModal"

type Props = {
  task: Components.Schemas.CaseUserTask
  caseId: Components.Schemas.Case["id"]
}

export const TaskButton: React.FC<Props> = ({ task, caseId }) => {
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <Button
        variant="primary"
        onClick={ openModal }
      >
        Taak afronden
      </Button>
      <FormModal 
        task={ task } 
        caseId={ caseId }
        isOpen={ isModalOpen }
        closeModal={ closeModal }
      />
    </>
  )
}

export default TaskButton
