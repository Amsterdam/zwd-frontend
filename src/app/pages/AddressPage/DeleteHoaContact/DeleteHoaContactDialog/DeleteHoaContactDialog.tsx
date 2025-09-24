import { ConfirmationDialog } from "app/components"
import { useHomeownerAssociationContactDelete } from "app/state/rest"

type Contact = Components.Schemas.Contact

type Props = {
  dialogId: string;
  hoaId: Components.Schemas.HomeownerAssociation["id"];
  contact: Contact;
}

export const DeleteHoaContactDialog: React.FC<Props> = ({ dialogId, hoaId, contact }) => {
  const [, { execDelete }] = useHomeownerAssociationContactDelete(hoaId, contact.id)

  const onConfirm = () => void execDelete()

  return (
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
  )
}

export default DeleteHoaContactDialog
