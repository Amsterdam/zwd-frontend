import {
  Dialog,
  ActionGroup,
  Button,
  Paragraph
} from "@amsterdam/design-system-react"
import { ReactNode } from "react"

type Props = {
  id: string
  title?: string
  content?: ReactNode
  onOk: () => void
  onOkText?: string
}

export const ConfirmationDialog: React.FC<Props> = ({
  id,
  title,
  content,
  onOk,
  onOkText
}) => (
  <Dialog
    id={id}
    footer={
      <ActionGroup>
        <Button form="ams-dialog-asking-to-confirm-form" onClick={onOk}>
          {onOkText ?? "Doorgaan"}
        </Button>
        <Button onClick={Dialog.close} variant="secondary">
          Annuleer
        </Button>
      </ActionGroup>
    }
    heading={title ?? "Weet u zeker?"}
  >
    <Paragraph className="ams-mb--md">
      {content ??
        "Weet u zeker dat u door wilt gaan met het uitvoeren van deze actie?"}
    </Paragraph>
  </Dialog>
)

export default ConfirmationDialog
