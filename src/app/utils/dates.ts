import dayjs from "dayjs"

export const isValidDate = (dateString: string): boolean =>
  dayjs(dateString).isValid()

const DEFAULT_DATE_FORMAT = "DD-MM-YYYY"
const DEFAULT_DATE_FORMAT_TIME = "DD-MM-YYYY HH:mm"

export const formatDate = (
  dateString: string,
  includeTime: boolean = false
): string =>
  dayjs(dateString).format(
    includeTime ? DEFAULT_DATE_FORMAT_TIME : DEFAULT_DATE_FORMAT
  )
