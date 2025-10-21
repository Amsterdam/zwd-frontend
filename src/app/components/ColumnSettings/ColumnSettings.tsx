import { Button } from "@amsterdam/design-system-react"
import { TableIcon } from "@amsterdam/design-system-react-icons"

export const ColumnSettings = () => {
  return (
    <Button
      id="column-settings-button"
      variant="secondary"
      icon={<TableIcon />}
      iconBefore
      onClick={() => {}}
    >
      Kolomweergave
    </Button>
  )
}
