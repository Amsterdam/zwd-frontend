import { Button } from "@amsterdam/design-system-react"
import { TableIcon } from "@amsterdam/design-system-react-icons"

export const ColumnSettings = ({ contextName }: { contextName: string }) => {

  const handleClick = () => {
    console.log(contextName)
  }

  return (
    <Button
      id="column-settings-button"
      variant="secondary"
      icon={<TableIcon />}
      iconBefore
      onClick={handleClick}
    >
      Kolomweergave
    </Button>
  )
}
