import {
  AddOrEditHoaContactDialog,
  FormMode
} from "../../AddOrEditHoaContactDialog/AddOrEditHoaContactDialog"

type Contact = components["schemas"]["Contact"]

type Props = {
  hoaId: components["schemas"]["HomeownerAssociation"]["id"]
  dialogId: string
  contact: Contact
}

export const EditHoaContactDialog: React.FC<Props> = ({
  hoaId,
  dialogId,
  contact
}) => (
  <AddOrEditHoaContactDialog
    mode={FormMode.EDIT}
    hoaId={hoaId}
    dialogId={dialogId}
    contact={contact}
  />
)

export default EditHoaContactDialog
