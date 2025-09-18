import { useDialog } from "app/hooks"
import { IconButton } from "@amsterdam/design-system-react"
import DeleteHoaContactDialog from "./DeleteHoaContactDialog/DeleteHoaContactDialog"
import { TrashBinIcon } from "@amsterdam/design-system-react-icons"

type Contact = Components.Schemas.Contact

type Props = {
  hoaId: Components.Schemas.HomeownerAssociation["id"];
  contact: Contact;
  label: string;
}

export const DeleteHoaContact: React.FC<Props> = ({ hoaId, contact, label }) => {
  const dialogId = `delete-contact-${contact.id}`
  const { openDialog } = useDialog(dialogId)

  return (
    <>
      <IconButton
        svg={TrashBinIcon}
        label={label}
        onClick={openDialog}
      />
      <DeleteHoaContactDialog dialogId={dialogId} hoaId={hoaId} contact={contact} />
    </>
  )
}

export default DeleteHoaContact
