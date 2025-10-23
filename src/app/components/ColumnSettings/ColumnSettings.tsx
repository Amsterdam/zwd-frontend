import { Button } from "@amsterdam/design-system-react"
import { TableIcon } from "@amsterdam/design-system-react-icons"
import { useDialog } from "app/hooks"
import ColumnSettingsDialog from "./ColumnSettingsDialog/ColumnSettingsDialog"

export const ColumnSettings = ({ contextName }: { contextName: string }) => {
  const dialogId = "ams-dialog-column-settings"
  const { openDialog, closeDialog } = useDialog(dialogId)

  return (
    <>
      <Button
        id="column-settings-button"
        variant="secondary"
        icon={<TableIcon />}
        iconBefore
        onClick={openDialog}
      >
        Kolomweergave
      </Button>

      <ColumnSettingsDialog
        dialogId={dialogId}
        contextName={contextName}
        onClose={closeDialog}
      />
    </>
  )
}
