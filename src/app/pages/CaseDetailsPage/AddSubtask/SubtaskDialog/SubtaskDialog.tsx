import { Dialog } from "@amsterdam/design-system-react"
import { useParams } from "react-router-dom"
import { Form, FormActionButtons, SelectField } from "app/components/forms"
import { useCaseProcesses, useCaseProcessesStart } from "app/state/rest"
import { useMemo } from "react"

type Props = {
  id: string
}

type Value = boolean | string | object
type FormData = Record<string, Value>

type Option = { 
  value: string, 
  label: string 
}

export const SubtaskDialog: React.FC<Props> = ({ id }) => {
  const { caseId } = useParams()
  const [data] = useCaseProcesses()
  const [, { execPost }] = useCaseProcessesStart(Number(caseId))
  

  const options: Option[] = useMemo(() => {
    if (!data) return []
    return data.map(({ id, name }) => ({ value: `${ id }`, label: name }))
  }, [data])
  

  const onSubmit = (variables: FormData) => {
    execPost(variables)
      .then((resp) => {
        console.log("Succes:", resp) 
      }).catch((err) => {
        console.log("Error creating case:", err)
      })
  }

  return (
    <Dialog heading="Taak opvoeren" id={ id } >
      <Form onSubmit={ onSubmit } >
        <SelectField
          name="workflow_option_id"
          label="Selecteer een taak"
          options={ options } 
          hasDefaultOption
          validation={{ required: true }}
        />
        <FormActionButtons okText="Taak opvoeren" onCancel={ Dialog.close } />
      </Form>
    </Dialog>
  )
}

export default SubtaskDialog
