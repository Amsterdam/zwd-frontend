import type {
  FieldValues,
  RegisterOptions,
  UseFormReturn
} from "react-hook-form"
import {
  Field,
  Label,
  FileInput,
  Paragraph
} from "@amsterdam/design-system-react"

const ACCEPTED_FILE_TYPES =
  "application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain, image/png, image/jpeg"
const MAX_FILE_SIZE_MB = 100
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
const MAX_FILE_SIZE_ERROR_MESSAGE = `De maximale bestandsgrootte mag niet groter zijn dan ${MAX_FILE_SIZE_MB} MB.`

type Props = {
  name: string
  label?: string
  validation: RegisterOptions
  formMethods?: UseFormReturn<FieldValues>
}

export const FileInputField: React.FC<Props> = ({
  name,
  label,
  validation = {},
  formMethods = {}
}) => {
  const { formState, register } = formMethods as UseFormReturn<FieldValues>
  const hasError = !!formState?.errors?.[name]
  const errorMessage = formState?.errors?.[name]?.message as string

  return (
    <Field>
      <Label htmlFor={name}>{label}</Label>
      <Paragraph size="small">
        De volgende bestandstypes zijn toegestaan: PDF, Word-documenten,
        tekstbestanden en afbeeldingen in PNG- en JPEG-formaat. De maximale
        bestandsgrootte is {MAX_FILE_SIZE_MB} MB.
      </Paragraph>
      <FileInput
        style={{ color: hasError ? "#EC0000" : "#000000", width: "100%" }}
        id={name}
        accept={ACCEPTED_FILE_TYPES}
        {...(register
          ? register(name, {
              validate: {
                required: (files) =>
                  !validation.required ||
                  (files && files.length > 0) ||
                  "Bestand is verplicht",
                maxSize: (files) =>
                  !files ||
                  !files[0] ||
                  files[0].size <= MAX_FILE_SIZE_BYTES ||
                  MAX_FILE_SIZE_ERROR_MESSAGE
              }
            })
          : {})}
      />
      {hasError && (
        <Paragraph style={{ color: "#EC0000" }}>{errorMessage}</Paragraph>
      )}
    </Field>
  )
}

export default FileInputField
