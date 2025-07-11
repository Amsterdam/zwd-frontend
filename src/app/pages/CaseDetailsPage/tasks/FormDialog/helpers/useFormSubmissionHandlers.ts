import { useState } from "react"
import {
  useCaseClose,
  useTaskComplete,
  useTaskCompleteFileUpload
} from "app/state/rest"
import { ComletedTaskFormData } from "../forms/CompletedTaskForm"
import type { GenericTaskFormData } from "./types"

export const useFormSubmissionHandlers = (
  taskId: string,
  caseId: Components.Schemas.Case["id"]
) => {
  const [loading, setLoading] = useState(false)
  const [, { execPost }] = useTaskComplete({ lazy: true })
  const [, { execPost: execPostFile }] = useTaskCompleteFileUpload()
  const [, { execPost: execPostCaseClose }] = useCaseClose({ lazy: true })

  const submitForm = async (
    variables: ComletedTaskFormData | GenericTaskFormData
  ) => {
    setLoading(true)
    try {
      await execPost({
        case_user_task_id: taskId,
        case: caseId,
        variables
      })
    } catch (err) {
      console.error("Error creating task:", err)
    } finally {
      setLoading(false)
    }
  }

  const submitFormFile = async (variables: {
    name?: string
    upload: FileList
  }) => {
    setLoading(true)
    const formData = new FormData()
    formData.append("case", caseId.toString())
    formData.append("name", variables?.name ?? variables.upload[0]?.name)
    formData.append("document", variables.upload[0])
    formData.append("case_user_task_id", taskId)

    try {
      await execPostFile(formData as unknown as Partial<GenericTaskFormData>)
    } finally {
      setLoading(false)
    }
  }

  const submitFormCaseClose = async (
    variables: Pick<Components.Schemas.CaseClose, "reason" | "description">
  ) => {
    setLoading(true)
    try {
      await execPostCaseClose({
        ...variables,
        case_user_task_id: taskId,
        case: caseId
      })
    } catch (err) {
      console.error("Error closing case:", err)
    } finally {
      setLoading(false)
    }
  }

  return { loading, submitForm, submitFormFile, submitFormCaseClose }
}
