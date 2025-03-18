import { MouseEvent } from "react"
import { Row } from "@amsterdam/design-system-react"
import type { FieldValues, UseFormReturn } from "react-hook-form"
import { CancelButton } from "./CancelButton"
import { SubmitButton } from "./SubmitButton"

type Props = {
  okText: string
  onOk?: () => void
  cancelText?: string
  onCancel?: (event: MouseEvent<HTMLButtonElement>) => void
  loading?: boolean
  formMethods?: UseFormReturn<FieldValues>
  name: string  // This prop is required for passing the formMethods to the children
}

export const FormActionButtons: React.FC<Props> = ({
  okText,
  onOk,
  cancelText,
  onCancel,
  loading = false,
  formMethods
}) => (
  <Row style={{ marginTop: 24 }}>
    <CancelButton label={cancelText} onCancel={onCancel} />
    <SubmitButton
      label={okText}
      loading={loading}
      formState={formMethods?.formState}
      onSubmit={onOk}
    />
  </Row>
)
