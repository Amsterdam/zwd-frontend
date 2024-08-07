import { Row, Button } from "@amsterdam/design-system-react"
import { Spinner } from "app/components"
import React from "react"

type Props = {
  onCancel: () => void 
  loading?: boolean 
  disabled?: boolean
}

export const SubmitButtonRow: React.FC<Props> = ({ onCancel, disabled = false, loading = false }) => (
  <Row align="between">
    <Button type="submit" disabled={ disabled }>
      Taak afronden  
      <Spinner loading={ loading } size={ 32 } color="#FFFFFF"/>
    </Button>
    <Button variant="tertiary" onClick={ onCancel }>
      Annuleer  
    </Button>
  </Row>
)
