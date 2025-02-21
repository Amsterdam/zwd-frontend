import React, { useMemo } from "react"
import { useParams } from "react-router-dom"
import { AxiosResponse } from "axios"
import { Form, FormActionButtons, SelectField } from "app/components"
import { useAdvisor, useAdvisors } from "app/state/rest"
import type { GenericTaskFormData } from "../helpers/types"

type Props = {
  loading?: boolean
  closeModal: () => void
  submitForm: (variables: GenericTaskFormData) => void
  form: FormItem[]
}

export const AdvisorForm: React.FC<Props> = ({
  closeModal,
  submitForm,
  loading = false,
  form
}) => {
  const { caseId } = useParams()
  const caseIdNumber = Number(caseId)
  const [data] = useAdvisors(caseIdNumber)
  const [, { execPatch }] = useAdvisor(caseIdNumber)
  const formItem = form[0]

  const options: FormItem["options"] = useMemo(() => {
    if (!data) return []
    return data.map(({ id, name }) => ({
      value: id,
      label: name
    }))
  }, [data])

  const onSubmitAdvisor = (data: GenericTaskFormData) => {
    const advisorId = Number(data.form_add_advisor)
    execPatch({
      advisor: advisorId
    })
      .then((resp) => {
        if ((resp as AxiosResponse)?.status === 200) {
          const formData = {
            form_add_advisor: {
              value: options.find((option) => option.value === advisorId)?.label
            }
          }
          submitForm(formData)
        }
      })
      .catch((err) => {
        console.error("Error patching advisor", err)
      })
  }

  return (
    <Form onSubmit={onSubmitAdvisor}>
      <SelectField
        name={formItem.name}
        label={formItem.label}
        options={options}
        validation={{ required: formItem.required }}
        hasDefaultOption
      />
      <FormActionButtons
        okText="Taak afronden"
        onCancel={closeModal}
        loading={loading}
      />
    </Form>
  )
}
