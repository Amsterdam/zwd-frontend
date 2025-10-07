import { Button, Row } from "@amsterdam/design-system-react"
import { PlusIcon } from "@amsterdam/design-system-react-icons"
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
    <Row align="end" style={{ marginBottom: "1rem" }}>
      <Button
        key="id-add-contact"
        variant="primary"
        icon={PlusIcon}
        iconBefore
        onClick={openDialog}
      >
        {label ?? "Contactpersoon toevoegen"}
      </Button>
      <AddHoaContactDialog hoaId={hoaId} dialogId={dialogId} />
    </Row>
  )
}

export default AddHoaContact
