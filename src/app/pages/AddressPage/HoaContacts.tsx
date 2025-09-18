import { Heading } from "@amsterdam/design-system-react"
import { ColumnType, createStringSorter, Table } from "app/components"
import { CopyEmailButton } from "app/components/CopyEmailButton/CopyEmailButton"
import { useHomeownerAssociationContacts } from "app/state/rest"
import DeleteHoaContact from "./DeleteHoaContact/DeleteHoaContact"
import EditHoaContact from "./EditHoaContact/EditHoaContact"
import AddHoaContact from "./AddHoaContact/AddHoaContact"

type Props = {
  hoaId: Components.Schemas.HomeownerAssociation["id"]
}

type Contact = Components.Schemas.Contact

export const HoaContacts: React.FC<Props> = ({ hoaId }) => {
  const [contacts, { isBusy }] = useHomeownerAssociationContacts(hoaId)

  const columns: ColumnType<Contact>[] = [
    {
      header: "Naam",
      dataIndex: "fullname",
      sorter: createStringSorter<Contact>("fullname"),
      defaultSortOrder: "DESCEND"
    },
    {
      header: "E-mail",
      dataIndex: "email",
      sorter: createStringSorter<Contact>("email")
    },
    {
      header: "Telefoon",
      dataIndex: "phone",
      sorter: createStringSorter<Contact>("phone")
    },
    {
      header: "Functie in vve",
      dataIndex: "role",
      sorter: createStringSorter<Contact>("role")
    },
    {
      header: "Acties",
      dataIndex: "actions",
      render: (_, record: Contact) => (
        <div style={{ display: "flex" }}>
          <CopyEmailButton email={record.email} name={record.fullname} />
          <EditHoaContact hoaId={hoaId} contact={record} label={`Bewerk ${record.fullname}`} />
          <DeleteHoaContact hoaId={hoaId} contact={record} label={`Verwijder ${record.fullname}`} />
        </div>
      )
    }
  ] as ColumnType<Contact>[]

  return (
    <>
      <Heading level={2}>Contactpersonen</Heading>
      <Table
        loading={isBusy}
        data={contacts || []}
        columns={columns}
        emptyPlaceholder="Geen contactpersonen gevonden"
      />
      <AddHoaContact hoaId={hoaId} />
    </>
  )
}

export default HoaContacts
