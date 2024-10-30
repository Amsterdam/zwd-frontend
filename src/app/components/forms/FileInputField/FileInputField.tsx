import type { FieldValues, UseFormRegister, FormState, RegisterOptions } from "react-hook-form"
import { Field, Label, FileInput, Paragraph } from "@amsterdam/design-system-react"

const ACCEPTED_FILE_TYPES = "application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain, image/png, image/jpeg"

type Props = {
  name: string
  label?: string
  register?: UseFormRegister<FieldValues>
  formState?: FormState<FieldValues>
  validation: RegisterOptions
}

export const FileInputField: React.FC<Props> = ({ name, label, register, formState, validation = {}, ...rest }) => {
  const hasError = !!formState?.errors?.[name]

  return (
    <Field>
      <Label htmlFor={ name } >{ label }</Label>
      <Paragraph size="small">
        De volgende bestandstypes zijn toegestaan: PDF, Word-documenten, tekstbestanden en afbeeldingen in PNG- en JPEG-formaat.
      </Paragraph>
      <FileInput 
        style={{ color: hasError ? "#EC0000" : "#000000" }}
        id={ name }
        accept={ ACCEPTED_FILE_TYPES }
        { ...(register ? register(name, validation) : {}) } 
        { ...rest }
      />
    </Field>
  )
}
