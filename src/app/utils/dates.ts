import dayjs from "dayjs"

export const isValidDate = (dateString: string): boolean => {
  // Regex to exclude strings that are numeric because they are misinterpreted as timestamps by dayjs
  if (/^\d+$/.test(dateString)) return false
  return dayjs(dateString).isValid()
}
const DEFAULT_DATE_FORMAT = "DD-MM-YYYY"
const DEFAULT_DATE_FORMAT_TIME = "DD-MM-YYYY HH:mm"
const DEFAULT_TIME_FORMAT = "HH:mm"
export const ISO_DATE_FORMAT_TIME = "YYYY-MM-DD HH:mm"

export const formatDate = (
  dateString?: string,
  includeTime: boolean = false
): string =>
  dayjs(dateString).format(
    includeTime ? DEFAULT_DATE_FORMAT_TIME : DEFAULT_DATE_FORMAT
  )

export const formatTime = (dateString: string): string =>
  dayjs(dateString).format(DEFAULT_TIME_FORMAT)
