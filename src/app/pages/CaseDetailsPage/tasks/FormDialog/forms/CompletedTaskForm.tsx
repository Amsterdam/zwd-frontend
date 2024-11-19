import { CheckboxField, Form, FormActionButtons } from "app/components"

export type ComletedTaskFormData = {
  completed: boolean
}

type Props = {
  loading?: boolean 
  closeModal: () => void 
  submitForm: (variables: ComletedTaskFormData) => void
}

export const CompletedTaskForm: React.FC<Props> = ({ closeModal, submitForm, loading = false }) => {

  const onSubmit = (data: ComletedTaskFormData) => submitForm(data)

  return (
    <Form onSubmit={ onSubmit } formGrid={{ narrow: 4, medium: 6, wide: 10 }} >
      <CheckboxField 
        name="completed"
        label="Ja, deze taak is afgerond"
        validation={{ required: true }}
      />
      <FormActionButtons 
        okText="Taak afronden" 
        onCancel={ closeModal } 
        loading={ loading }
      />
    </Form>
  )
}
