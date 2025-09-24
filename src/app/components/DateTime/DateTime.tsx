import { formatDate, formatTime } from "app/utils/dates"

type Props = {
  text: string
  includeTime?: boolean
}

export const DateTime = ({ text, includeTime = false }: Props) => (
  <span
    style={{
      display: "inline-flex",
      flexWrap: "wrap",
      gap: "0 0.25ch"
    }}
  >
    <span style={{ whiteSpace: "nowrap" }}>{formatDate(text)}</span>
    {includeTime && (
      <span style={{ whiteSpace: "nowrap" }}>{formatTime(text)}</span>
    )}
  </span>
)

export default DateTime
