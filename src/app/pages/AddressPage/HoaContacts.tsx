import { Heading } from "@amsterdam/design-system-react"
import { ColumnType, createStringSorter, Table } from "app/components"
import { useHoaContacts } from "app/state/rest"

type Props = {
  hoaId: Components.Schemas.HomeownerAssociation["id"]
}

type Contact = Components.Schemas.Contact

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
  }
] as ColumnType<Contact>[]

export const HoaContacts: React.FC<Props> = ({ hoaId }) => {
  const [contacts, { isBusy }] = useHoaContacts(hoaId)

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
