import { Button } from "@amsterdam/design-system-react"


type Props = {
  label?: string
  onCancel?: () => void
}
  
export const CancelButton: React.FC<Props> = ({ label = "Annuleer", onCancel }) => (
  <div>
    <Button variant="secondary" onClick={ onCancel }>
      { label }
    </Button>
  </div>
)
  