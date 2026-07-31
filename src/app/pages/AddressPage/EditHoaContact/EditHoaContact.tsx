import { IconButton } from "@amsterdam/design-system-react"
import { PencilIcon } from "@amsterdam/design-system-react-icons"
import { useDialog } from "app/hooks"
import EditHoaContactDialog from "./EditHoaContactDialog/EditHoaContactDialog"

type Contact = components["schemas"]["Contact"]

type Props = {
  hoaId: components["schemas"]["HomeownerAssociation"]["id"]
  contact: Contact
  label?: string
}

export const EditHoaContact: React.FC<Props> = ({ hoaId, contact, label }) => {
  const dialogId = `edit-contact-${contact.id}`
  const { openDialog } = useDialog(dialogId)

  return (
    <>
      <IconButton
        svg={PencilIcon}
        label={label ?? `Bewerk ${contact.fullname}`}
        onClick={openDialog}
        size="large"
      />
      <EditHoaContactDialog
        hoaId={hoaId}
        dialogId={dialogId}
        contact={contact}
      />
    </>
  )
}

export default EditHoaContact
