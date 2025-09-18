import { ConfirmationDialog } from "app/components"
import { useHoaContactDelete } from "app/state/rest"

type Contact = Components.Schemas.Contact

type Props = {
  id: string;
  hoaId: Components.Schemas.HomeownerAssociation["id"];
  contact: Contact;
}

export const DeleteHoaContactDialog: React.FC<Props> = ({ id, hoaId, contact }) => {
  const [, { execDelete }] = useHoaContactDelete(hoaId, contact.id)

  const onConfirm = () => void execDelete()

  return (
    <ConfirmationDialog
      id={id}
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
