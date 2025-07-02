import React, { useMemo } from "react"
import {
  Form,
  FormActionButtons,
  RadioGroupFieldSet,
  TextAreaField
} from "app/components"
import { useCaseCloseReasons } from "app/state/rest"

type CaseCloseFormValues = Pick<
  Components.Schemas.CaseClose,
  "reason" | "description"
>

type Props = {
  loading?: boolean
  closeModal: () => void
  submitFormCaseClose: (variables: CaseCloseFormValues) => void
  form: FormItem[]
}

export const CloseCaseForm: React.FC<Props> = ({
  closeModal,
  submitFormCaseClose,
  loading = false
}) => {
  const [reasons] = useCaseCloseReasons()

  const reasonOptions: FormItem["options"] = useMemo(
    () =>
      reasons?.map(({ id, name }) => ({
        value: id,
        label: name
      })) || [],
    [reasons]
  )

  const otherOptionId = useMemo(
    () =>
      reasons?.find(
        (option) => option.name === "Anders, vermeld in toelichting"
      )?.id,
    [reasons]
  )

  const onSubmitCaseClose = ({ reason, description }: CaseCloseFormValues) => {
    submitFormCaseClose({ reason, description })
  }

  return (
    <Form onSubmit={onSubmitCaseClose}>
      <RadioGroupFieldSet
        name="reason"
        label="Wat is de reden voor het sluiten van de zaak?"
        options={reasonOptions}
        validation={{ required: true }}
      />
      <TextAreaField
        name="description"
        label="Toelichting"
        validation={{ required: true, maxLength: 1000 }}
        shouldShow={(formValues) =>
          formValues.reason === otherOptionId?.toString()
        }
      />
      <FormActionButtons
        okText="Taak afronden"
        onCancel={closeModal}
        loading={loading}
        name="ACTION_BUTTONS"
      />
    </Form>
  )
}
