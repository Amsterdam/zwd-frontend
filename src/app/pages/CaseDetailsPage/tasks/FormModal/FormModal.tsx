import { useState } from "react"
import { Modal } from "app/components"
import { useTaskComplete } from "app/state/rest"
import { CompletedTaskForm, ComletedTaskFormData } from "../forms/CompletedTaskForm" 
import { GenericTaskForm, GenericTaskFormData, FormItem } from "../forms/GenericTaskForm"


export type Props = {
  // task: Components.Schemas.CaseUserTask
  task: Omit<Components.Schemas.CaseUserTask, "form"> & {
    form?: FormItem[] // Form is generated as any
  };
  caseId: Components.Schemas.Case["id"]
  isOpen: boolean
  closeModal: () => void
}

export const FormModal: React.FC<Props> = ({ isOpen, closeModal, task, caseId }) => {
  const [loading, setLoading] = useState(false)
  const [, { execPost }] = useTaskComplete({ lazy: true })

  const { form, name } = task
  
  const submitForm = (variables: ComletedTaskFormData | GenericTaskFormData ) => {
    setLoading(true)
    const values = {
      case_user_task_id: task?.id.toString(),
      case: caseId,
      variables: variables
    }

    execPost(values)
      .then((resp) => {
        console.log("Succes:", resp) 
      }).catch((err) => {
        console.log("Error creating case:", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const hasForm = form && form.length > 0
  const title = hasForm ? `Rond de taak "${ name }" af` : `Is de taak "${ name }" afgerond?`

  return (
    <Modal title={ title } open={ isOpen } onCancel={ closeModal }>
      { hasForm ? (
        <GenericTaskForm 
          closeModal={ closeModal }  
          loading={ loading } 
          submitForm={ submitForm } 
          form={ form } 
        />
      ) : (
        <CompletedTaskForm 
          closeModal={ closeModal }  
          loading={ loading } 
          submitForm={ submitForm } 
        />
      )}
    </Modal>
  )
}

export default FormModal