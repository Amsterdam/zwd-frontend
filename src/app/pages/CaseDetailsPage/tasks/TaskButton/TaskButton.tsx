import { useModal, LinkButton } from "app/components"
import FormModal from "../FormModal/FormModal"

type Props = {
  task: Components.Schemas.CaseUserTask
  caseId: Components.Schemas.Case["id"]
}

// const StyledButton

export const TaskButton: React.FC<Props> = ({ task, caseId }) => {
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <LinkButton label="Taak afronden" onClick={ openModal } />
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
