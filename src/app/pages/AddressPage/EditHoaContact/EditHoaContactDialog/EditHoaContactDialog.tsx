import { AddOrEditHoaContactDialog, FormMode } from "../../AddOrEditHoaContactDialog/AddOrEditHoaContactDialog"

type Contact = Components.Schemas.Contact

type Props = {
  hoaId: Components.Schemas.HomeownerAssociation["id"];
  dialogId: string;
  contact: Contact;
}

export const EditHoaContactDialog: React.FC<Props> = ({
  hoaId,
  dialogId,
  contact,
}) => (
  <AddOrEditHoaContactDialog
    mode={FormMode.EDIT}
    hoaId={hoaId}
    dialogId={dialogId}
    contact={contact}
  />
)

export default EditHoaContactDialog
