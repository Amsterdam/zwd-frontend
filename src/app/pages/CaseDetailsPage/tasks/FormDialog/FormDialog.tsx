import { useState } from "react"
import { Dialog } from "@amsterdam/design-system-react"
import { useTaskComplete } from "app/state/rest"
import { CompletedTaskForm, ComletedTaskFormData } from "./forms/CompletedTaskForm" 
import { GenericTaskForm, GenericTaskFormData, FormItem } from "./forms/GenericTaskForm"


export type Props = {
  dialogId: string
  task: Omit<Components.Schemas.CaseUserTask, "form"> & {
    form?: FormItem[] // Form is generated as any
  };
  caseId: Components.Schemas.Case["id"]
  closeDialog: () => void
}

export const FormDialog: React.FC<Props> = ({ dialogId, task, caseId, closeDialog }) => {
  const [loading, setLoading] = useState(false)
  const [, { execPost }] = useTaskComplete({ lazy: true })

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

  const { form, name } = task
  const hasForm = form && form.length > 0
  const title = hasForm ? `Rond de taak "${ name }" af` : `Is de taak "${ name }" afgerond?`
  
  return (
    <Dialog
      id={ dialogId }
      heading={ title }
    >
      { hasForm ? (
        <GenericTaskForm 
          closeModal={ closeDialog }  
          loading={ loading } 
          submitForm={ submitForm } 
          form={ form } 
        />
      ) : (
        <CompletedTaskForm 
          closeModal={ closeDialog }  
          loading={ loading } 
          submitForm={ submitForm } 
        />
      )}
    </Dialog>
  )
}

export default FormDialog
