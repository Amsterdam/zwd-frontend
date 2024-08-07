import { Field, Label, Select } from "@amsterdam/design-system-react"
import { useForm } from "react-hook-form"
import withExceptionCapturing from "app/utils/withExceptionCapturing"
import { SubmitButtonRow } from "./SubmitButtonRow"
import styled from "styled-components"


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

const StyledLabel = styled(Label)`
  font-size: var(--ams-text-level-5-font-size);
`

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
  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm<GenericTaskFormData>()

  const onSubmit = handleSubmit((data) => {
    const formattedData = formatData(form, data)
    submitForm(formattedData)
  })
  
  return (
    <form className="ams-gap--md" onSubmit={withExceptionCapturing(onSubmit)}>
      { form.map((formItem: FormItem, index: number) => {
        switch(formItem.type) {
        case "select":
          return (
            <Field key={index}>
              <StyledLabel htmlFor={formItem.name} >{formItem.label}</StyledLabel>
              <Select {...register(formItem.name, { required: formItem.required })}>
                { formItem.options?.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Field>
          )
        default:
          console.log("Form item must be of type 'select'")
          return null // or handle other field types
        }
      })}
      <SubmitButtonRow 
        disabled={ !isValid || loading } 
        loading={ loading } 
        onCancel={ closeModal } 
      />
    </form>
  )
}
