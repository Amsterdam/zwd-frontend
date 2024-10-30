import { MouseEvent } from "react"
import { Button } from "@amsterdam/design-system-react"

type Props = {
  label?: string
  onCancel?: (event: MouseEvent<HTMLButtonElement>) => void
}
  
export const CancelButton: React.FC<Props> = ({ label = "Annuleer", onCancel }) => (
  <div>
    <Button variant="secondary" onClick={ onCancel }>
      { label }
    </Button>
  </div>
)
  