import { FieldValues, UseFormReturn } from "react-hook-form"
import {
  ImportInstructions as LetterImportInstructions,
  ImportFormFields as LetterImportFormFields
} from "../types/LetterImport"
import {
  ImportInstructions as CourseParticipantImportInstructions,
  ImportFormFields as CourseParticipantImportFormFields
} from "../types/CourseParticipantImport"

export type ImportType = "letters" | "course-participants"

export type LetterFormData = {
  file: FileList
  date: string
  author_name: string
  description: string
}

export type CourseParticipantFormData = {
  file: FileList
}

export type ImportFormData = LetterFormData | CourseParticipantFormData

export type ImportResultData = {
  counts?: Record<string, number>
  messages?: string[]
  warnings?: string[]
  errors?: Array<{
    row_number: number
    field?: string | null
    message: string
  }>
  failed_rows_data?: {
    headers: string[]
    rows: Record<string, string>[]
  }
}

export type ImportTypeConfig<T extends FieldValues = FieldValues> = {
  label: string
  labelShort: string
  value: ImportType
  InstructionsComponent: React.FC
  FormFieldsComponent: React.FC<{ formMethods?: UseFormReturn<FieldValues> }>
  getDefaultValues: (userFullName?: string) => Partial<T>
  buildFormData: (data: T) => FormData
}

export type ImportTypeRegistry = {
  [K in ImportType]: ImportTypeConfig
}

export const importTypeRegistry: ImportTypeRegistry = {
  letters: {
    label: "Brieven importeren",
    labelShort: "Brieven",
    value: "letters",
    InstructionsComponent: LetterImportInstructions,
    FormFieldsComponent: LetterImportFormFields,
    getDefaultValues: (userFullName) => ({
      date: "",
      author_name: userFullName || "",
      description: ""
    }),
    buildFormData: (data) => {
      const formData = new FormData()
      const letterData = data as LetterFormData
      formData.append("file", letterData.file[0])
      formData.append("date", letterData.date)
      formData.append("author_name", letterData.author_name)
      formData.append("description", letterData.description)
      return formData
    }
  },

  "course-participants": {
    label: "Cursusdeelnemers importeren",
    labelShort: "Cursusdeelnemers",
    value: "course-participants",
    InstructionsComponent: CourseParticipantImportInstructions,
    FormFieldsComponent: CourseParticipantImportFormFields,
    getDefaultValues: () => ({}),
    buildFormData: (data) => {
      const formData = new FormData()
      const courseData = data as CourseParticipantFormData
      formData.append("file", courseData.file[0])
      return formData
    }
  }
}
