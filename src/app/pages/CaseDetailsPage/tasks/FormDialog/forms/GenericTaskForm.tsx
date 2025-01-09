import { Form, SelectField, TextAreaField, FormActionButtons, FileInputField } from "app/components"


export type FormItem = {
  type: string
  name: string
  label: string
  required?: boolean
  options?: { value: string, label: string }[]
  tooltip?: string
}

type Value = boolean | string | object
export type GenericTaskFormData = Record<string, Value>

type Props = {
  loading?: boolean 
  closeModal: () => void 
  submitForm: (variables: GenericTaskFormData) => void
  form: FormItem[]
}

const formatData = (form: FormItem[], data: GenericTaskFormData) => (
  form.reduce<GenericTaskFormData>((acc, item) => {
    const key = item.name
    const value = data[key]
    if (value) {
      acc[key] = {
        "value": value
      }
    }
    return acc
  }, {})
)

export const GenericTaskForm: React.FC<Props> = ({ closeModal, submitForm, loading = false, form }) => {

  const onSubmit = (data: GenericTaskFormData) => {
    const formattedData = formatData(form, data)
    submitForm(formattedData)
  }
  
  return (
    <Form onSubmit={ onSubmit } formGrid={{ narrow: 4, medium: 6, wide: 10 }} >
      { form.map((formItem: FormItem, index: number) => {
        switch(formItem.type) {
        case "file":
          return (
            <FileInputField 
              key={index}
              name={ formItem.name } 
              label={ formItem.label } 
              validation={{ required: formItem.required }}
            />
          )
        case "select":
          return (
            <SelectField
              key={index}
              name={ formItem.name } 
              label={ formItem.label }
              options={ formItem.options } 
              validation={{ required: formItem.required }}
            />
          )
        case "text":
          return (
            <TextAreaField 
              key={index}
              name={ formItem.name } 
              label={ formItem.label } 
              validation={{ required: formItem.required }}
            />
          )
        default:
          console.log(`Form item "${ formItem.type }" not supported. Type must be "select" or "text"` )
          return null // or handle other field types
        }
      })}
      <FormActionButtons 
        okText="Taak afronden" 
        onCancel={ closeModal } 
        loading={ loading }
      />
    </Form>
  )
}
