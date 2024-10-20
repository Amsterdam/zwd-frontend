import { Row } from "@amsterdam/design-system-react"
import { FieldValues, FormState } from "react-hook-form"
import { CancelButton } from "./CancelButton"
import { SubmitButton } from "./SubmitButton"


type Props = {
  okText: string
  onOk?: () => void
  cancelText?: string
  onCancel?: () => void
  loading?: boolean
  formState?: FormState<FieldValues>
}
  
export const FormActionButtons: React.FC<Props> = ({ okText, onOk, cancelText, onCancel, loading = false, formState }) => (
  <Row>
    <CancelButton label={ cancelText } onCancel={ onCancel } />
    <SubmitButton label={ okText } loading={ loading } formState={ formState } onSubmit={ onOk }/>
  </Row>
)
  