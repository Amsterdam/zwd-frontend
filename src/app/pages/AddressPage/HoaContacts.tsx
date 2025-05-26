import { Heading } from "@amsterdam/design-system-react"
import { ColumnType, Table } from "app/components"
import { useHoaContacts } from "app/state/rest"

type Props = {
  hoaId: Components.Schemas.HomeownerAssociation["id"]
}

type Contact = Components.Schemas.Contact

const columns: ColumnType<Contact>[] = [
  {
    header: "Naam",
    dataIndex: "fullname",
    sorter: (a: Contact, b: Contact) =>
      a.fullname.localeCompare(b.fullname),
    defaultSortOrder: "DESCEND"
  },
  {
    header: "E-mail",
    dataIndex: "email",
    sorter: (a: Contact, b: Contact) => {
      const nameA = (a?.email as string | undefined) ?? ""
      const nameB = (b?.email as string | undefined) ?? ""
      return nameA.localeCompare(nameB)
    }
  },
  {
    header: "Telefoon",
    dataIndex: "phone",
    sorter: (a: Contact, b: Contact) => {
      const nameA = (a?.phone as string | undefined) ?? ""
      const nameB = (b?.phone as string | undefined) ?? ""
      return nameA.localeCompare(nameB)
    }
  },
  {
    header: "Functie in vve",
    dataIndex: "role",
    sorter: (a: Contact, b: Contact) => {
      const nameA = (a?.role as string | undefined) ?? ""
      const nameB = (b?.role as string | undefined) ?? ""
      return nameA.localeCompare(nameB)
    }
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
