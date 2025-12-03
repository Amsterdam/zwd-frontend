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

const ACCEPTED_FILE_TYPES = "text/csv"
const MAX_FILE_SIZE_MB = 100
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
const MAX_FILE_SIZE_ERROR_MESSAGE = `De maximale bestandsgrootte mag niet groter zijn dan ${MAX_FILE_SIZE_MB} MB.`

type Props = {
  name: string
  label?: string
  validation: RegisterOptions
  formMethods?: UseFormReturn<FieldValues>
}

export const FileInputFieldCSV: React.FC<Props> = ({
  name,
  label,
  validation = {},
  formMethods = {}
}) => {
  const { formState, register } = formMethods as UseFormReturn<FieldValues>
  const hasError = !!formState?.errors?.[name]
  const errorMessage = formState?.errors?.[name]?.message as string

  const builtInValidators = {
    maxSize: (files: FileList | null) =>
      !files ||
      !files[0] ||
      files[0].size <= MAX_FILE_SIZE_BYTES ||
      MAX_FILE_SIZE_ERROR_MESSAGE,
    csvExtension: (files: FileList | null) => {
      if (!files || !files[0]) {
        return true // Required check is handled separately
      }
      const fileName = files[0].name.toLowerCase()
      return fileName.endsWith(".csv") || "Alleen CSV-bestanden zijn toegestaan"
    }
  }

  const mergedValidators = {
    ...builtInValidators,
    ...(validation.validate || {})
  }

  return (
    <Field>
      <Label htmlFor={name}>{label}</Label>
      <Paragraph size="small">
        Alleen CSV-bestanden zijn toegestaan (maximaal {MAX_FILE_SIZE_MB} MB).
      </Paragraph>
      <FileInput
        style={{ color: hasError ? "#EC0000" : "#000000", width: "100%" }}
        id={name}
        accept={ACCEPTED_FILE_TYPES}
        {...(register
          ? register(name, {
              required: validation.required,
              validate: mergedValidators
            })
          : {})}
      />
      {hasError && (
        <Paragraph style={{ color: "#EC0000" }}>{errorMessage}</Paragraph>
      )}
    </Field>
  )
}

export default FileInputFieldCSV
