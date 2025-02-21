import {
  Form,
  SelectField,
  TextAreaField,
  FormActionButtons
} from "app/components"
import type { GenericTaskFormData } from "../helpers/types"
import formatGenericData from "../helpers/formatGenericData"

type Props = {
  loading?: boolean
  closeModal: () => void
  submitForm: (variables: GenericTaskFormData) => void
  form: FormItem[]
}

export const GenericTaskForm: React.FC<Props> = ({
  closeModal,
  submitForm,
  loading = false,
  form
}) => {
  const onSubmit = (data: GenericTaskFormData) => {
    const formattedData = formatGenericData(form, data)
    submitForm(formattedData)
  }

  return (
    <Form onSubmit={onSubmit}>
      {form.map((formItem: FormItem, index: number) => {
        switch (formItem.type) {
        case "select":
          return (
            <SelectField
              key={index}
              name={formItem.name}
              label={formItem.label}
              options={formItem.options}
              validation={{ required: formItem.required }}
              hasDefaultOption
            />
          )
        case "text":
          return (
            <TextAreaField
              key={index}
              name={formItem.name}
              label={formItem.label}
              validation={{ required: formItem.required }}
            />
          )
        default:
          console.log(
            `Form item "${ formItem.type }" not supported. Type must be "select" or "text"`
          )
          return null // or handle other field types
        }
      })}
      <FormActionButtons
        okText="Taak afronden"
        onCancel={closeModal}
        loading={loading}
      />
    </Form>
  )
}
