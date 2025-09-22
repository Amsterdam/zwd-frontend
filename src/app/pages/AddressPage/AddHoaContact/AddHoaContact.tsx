import { Button } from "@amsterdam/design-system-react"
import { useDialog } from "app/hooks"
import AddHoaContactDialog from "./AddHoaContactDialog/AddHoaContactDialog"

type Props = {
  hoaId: Components.Schemas.HomeownerAssociation["id"]
  label?: string
}

export const AddHoaContact: React.FC<Props> = ({ hoaId, label }) => {
  const dialogId = `add-contact-${hoaId}`
  const { openDialog } = useDialog(dialogId)

  return (
    <>
      <Button
        variant="secondary"
        style={{ marginTop: "1.5rem" }}
        onClick={openDialog}
      >
        {label ?? "Contactpersoon toevoegen"}
      </Button>
      <AddHoaContactDialog hoaId={hoaId} dialogId={dialogId} />
    </>
  )
}

export default AddHoaContact
