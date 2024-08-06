import { Checkbox, Field } from "@amsterdam/design-system-react"
import { useForm } from "react-hook-form"
import withExceptionCapturing from "app/utils/withExceptionCapturing"
import { SubmitButtonRow } from "./SubmitButtonRow"

export type ComletedTaskFormData = {
  completed: boolean
}

type Props = {
  loading?: boolean 
  closeModal: () => void 
  submitForm: (variables: ComletedTaskFormData) => void
}

export const CompletedTaskForm: React.FC<Props> = ({ closeModal, submitForm, loading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm<ComletedTaskFormData>()

  const onSubmit = handleSubmit((data) => submitForm(data))

  return (
    <form className="ams-gap--md" onSubmit={withExceptionCapturing(onSubmit)}>
      <Field>
        <Checkbox {...register("completed", { required: true })} >
          Ja, deze taak is afgerond
        </Checkbox>
      </Field>
      <SubmitButtonRow 
        disabled={ !isValid || loading } 
        loading={ loading } 
        onCancel={ closeModal } 
      />
    </form>
  )
}
