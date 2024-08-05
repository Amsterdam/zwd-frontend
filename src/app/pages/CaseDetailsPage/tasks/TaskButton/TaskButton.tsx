import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button, Checkbox, Field, Row } from "@amsterdam/design-system-react"
import { Modal, Spinner, useModal } from "app/components"
import withExceptionCapturing from "app/utils/withExceptionCapturing"
import { useTaskComplete } from "app/state/rest"

type Props = {
  task: Components.Schemas.CaseUserTask
  caseId: Components.Schemas.Case["id"]
}

export const TaskButton: React.FC<Props> = ({ task, caseId }) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm()
  const [, { execPost }] = useTaskComplete({ lazy: true })
  
  const onSubmit = handleSubmit(() => {
    setLoading(true)
    const values = {
      case_user_task_id: task?.id.toString(),
      case: caseId,
      variables: {
        completed: true
      }
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
  })

  return (
    <>
      <Button
        variant="primary"
        onClick={openModal}
      >
        Taak afronden
      </Button>
      <Modal title={ `Rond de taak "${ task.name }" af`} open={ isModalOpen } onCancel={ closeModal }>
        <form className="ams-gap--md" onSubmit={withExceptionCapturing(onSubmit)}>
          <Field>
            <Checkbox  {...register("completed", { required: true })} >
              Ja, deze taak is afgerond
            </Checkbox>
          </Field>
          <Row align="end">
            <Button variant="secondary" onClick={ closeModal }>
              Annuleer  
            </Button>
            <Button type="submit" disabled={ !isValid || loading }>
              Taak afronden  
              <Spinner loading={ loading } size={ 32 } color="#FFFFFF"/>
            </Button>
          </Row>
        </form>
      </Modal>
    </>
  )
}

export default TaskButton
