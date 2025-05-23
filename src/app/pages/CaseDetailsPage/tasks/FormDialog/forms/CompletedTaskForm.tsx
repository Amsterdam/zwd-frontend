import { CheckboxField, Form, FormActionButtons } from "app/components"

export type ComletedTaskFormData = {
  completed: boolean
}

type Props = {
  loading?: boolean
  closeModal: () => void
  submitForm: (variables: ComletedTaskFormData) => void
}

export const CompletedTaskForm: React.FC<Props> = ({
  closeModal,
  submitForm,
  loading = false
}) => {
  const onSubmit = (data: ComletedTaskFormData) => submitForm(data)

  return (
    <Form onSubmit={onSubmit}>
      <CheckboxField
        name="completed"
        label="Ja, deze taak is afgerond"
        validation={{ required: true }}
      />
      <FormActionButtons
        okText="Taak uitvoeren"
        onCancel={closeModal}
        loading={loading}
        name="ACTION_BUTTONS"
      />
    </Form>
  )
}
