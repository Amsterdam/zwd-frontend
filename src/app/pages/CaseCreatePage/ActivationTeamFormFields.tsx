import React from "react"
import type { FieldValues, UseFormReturn } from "react-hook-form"
import {
  DateInputField,
  RadioGroupFieldSet,
  TextInputField
} from "app/components"
import {
  ACTIVATIETEAM_SUBJECTS,
  optionsActivatieteamSubjects,
  optionsActivatieteamTypes
} from "./formOptions"

type Props = {
  formMethods?: UseFormReturn<FieldValues>
  name: string // This prop is required for passing the formMethods to the children
  shouldShow: (formValues: FieldValues) => boolean
}

export const ActivationTeamFormFields: React.FC<Props> = ({
  formMethods,
  shouldShow
}) => {
  const { watch } = formMethods as UseFormReturn<FieldValues>
  const formValues = watch()
  const isVisible = shouldShow ? shouldShow(formValues) : true

  if (!isVisible) {
    return null
  }

  return (
    <>
      <RadioGroupFieldSet
        name="activationteam_type"
        label="Voor welke bijeenkomst wordt het VvE-activatieteam ingezet?"
        options={optionsActivatieteamTypes}
        validation={{ required: true }}
        formMethods={formMethods}
      />
      <RadioGroupFieldSet
        name="activationteam_subject"
        label="Wat is het onderwerp van de ledenvergadering of een informatiebijeenkomst?"
        options={optionsActivatieteamSubjects}
        validation={{ required: true }}
        formMethods={formMethods}
      />
      <TextInputField
        name="activationteam_subject_other"
        validation={{ required: true }}
        formMethods={formMethods}
        shouldShow={(formValues) =>
          formValues.activationteam_subject === ACTIVATIETEAM_SUBJECTS.ANDERS
        }
      />
      <DateInputField
        name="activationteam_meeting_date"
        label="Wat is de datum van de bijeenkomst?"
        validation={{ required: true }}
        formMethods={formMethods}
      />
    </>
  )
}

export default ActivationTeamFormFields
