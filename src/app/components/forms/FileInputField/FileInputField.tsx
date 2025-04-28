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
import { useState } from "react"

const ACCEPTED_FILE_TYPES =
  "application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain, image/png, image/jpeg"
const MAX_MB = 100
const MAX_FILE_SIZE = MAX_MB * 1024 * 1024
const ERROR_MESSAGE = `De maximale bestandsgrootte mag niet groter zijn dan ${MAX_FILE_SIZE / 1024 / 1024} MB.`

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
  formMethods = {},
  ...rest
}) => {
  const [fileError, setFileError] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined)
  const { formState, register, setError, trigger } =
    formMethods as UseFormReturn<FieldValues>
  const hasError = !!formState?.errors?.[name]

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setUploadedFile(file)
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError(ERROR_MESSAGE)
        setError(name, { type: "custom", message: ERROR_MESSAGE })
      } else {
        setFileError(null)
      }
    }
    void trigger()
  }

  const validateFile = () => {
    if (!uploadedFile) return "File is required."
    if (uploadedFile.size > MAX_FILE_SIZE) return ERROR_MESSAGE
    return true
  }

  return (
    <Field>
      <Label htmlFor={name}>{label}</Label>
      <Paragraph size="small">
        De volgende bestandstypes zijn toegestaan: PDF, Word-documenten,
        tekstbestanden en afbeeldingen in PNG- en JPEG-formaat. De maximale
        bestandsgrootte is {MAX_MB} MB.
      </Paragraph>
      <FileInput
        style={{ color: hasError ? "#EC0000" : "#000000", width: "100%" }}
        id={name}
        accept={ACCEPTED_FILE_TYPES}
        {...(register
          ? register(name, {
            required: validation.required ?? false,
            validate: validation.required ? validateFile : undefined
          })
          : {})}
        {...rest}
        onChange={handleFileChange}
      />
      {fileError && (
        <Paragraph style={{ color: "#EC0000" }}>{fileError}</Paragraph>
      )}
    </Field>
  )
}
