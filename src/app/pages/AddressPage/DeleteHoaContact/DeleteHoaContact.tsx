import { useHoaContactDelete } from "app/state/rest"
import { useDialog } from "app/hooks"
import { IconButton } from "@amsterdam/design-system-react"
import { ConfirmationDialog } from "app/components"
import { TrashBinIcon } from "@amsterdam/design-system-react-icons"

type Contact = Components.Schemas.Contact

type Props = {
  hoaId: Components.Schemas.HomeownerAssociation["id"];
  contact: Contact;
  label: string;
}

export const DeleteHoaContact: React.FC<Props> = ({ hoaId, contact, label }) => {
  const [, { execDelete }] = useHoaContactDelete(hoaId, contact.id)
  const dialogId = `delete-contact-${contact.id}`
  const { openDialog } = useDialog(dialogId)

  const onConfirm = () => {
    void execDelete()
  }

  return (
    <>
      <IconButton
        svg={TrashBinIcon}
        label={label}
        onClick={openDialog}
      />
      <ConfirmationDialog
        id={dialogId}
        title="Contactpersoon verwijderen"
        content={
          <span>
            Weet u zeker dat u contactpersoon <strong>{contact.fullname}</strong> wilt verwijderen?
          </span>
        }
        onOk={onConfirm}
        onOkText="Verwijderen"
      />
    </>
  )
}

export default DeleteHoaContact
