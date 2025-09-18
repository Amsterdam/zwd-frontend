import { Button, Heading, IconButton } from "@amsterdam/design-system-react"
import { PencilIcon } from "@amsterdam/design-system-react-icons"
import { ColumnType, createStringSorter, Table } from "app/components"
import { CopyEmailButton } from "app/components/CopyEmailButton/CopyEmailButton"
import { useHoaContacts } from "app/state/rest"
import DeleteHoaContact from "./DeleteHoaContact/DeleteHoaContact"

type Props = {
  hoaId: Components.Schemas.HomeownerAssociation["id"]
}

type Contact = Components.Schemas.Contact

export const HoaContacts: React.FC<Props> = ({ hoaId }) => {
  const [contacts, { isBusy }] = useHoaContacts(hoaId)

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
          <DeleteHoaContact hoaId={hoaId} contact={record} title={`Verwijder ${record.fullname}`} />
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
    </>
  )
}

export default HoaContacts
