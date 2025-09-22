import {
  AddOrEditHoaContactDialog,
  FormMode
} from "../../AddOrEditHoaContactDialog/AddOrEditHoaContactDialog"

type Props = {
  hoaId: Components.Schemas.HomeownerAssociation["id"]
  dialogId: string
}

export const AddHoaContactDialog: React.FC<Props> = ({ hoaId, dialogId }) => (
  <AddOrEditHoaContactDialog
    dialogId={dialogId}
    mode={FormMode.ADD}
    hoaId={hoaId}
  />
)

export default AddHoaContactDialog
