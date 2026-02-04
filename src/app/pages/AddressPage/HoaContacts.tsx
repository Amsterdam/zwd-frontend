import {
  ColumnType,
  createDateSorter,
  createStringSorter,
  Table
} from "app/components"
import { CopyEmailButton } from "app/components/CopyEmailButton/CopyEmailButton"
import { useHomeownerAssociationContacts } from "app/state/rest"
import { formatDate } from "app/utils/dates"
import DeleteHoaContact from "./DeleteHoaContact/DeleteHoaContact"
import EditHoaContact from "./EditHoaContact/EditHoaContact"
import AddHoaContact from "./AddHoaContact/AddHoaContact"

const contactPrimaryTagStyles = {
  display: "inline-block",
  verticalAlign: "text-bottom",
  background: "var(--ams-color-interactive)",
  color: "var(--ams-color-text-inverse)",
  fontSize: "0.75em",
  lineHeight: "1.1",
  padding: "0.225em 0.35em",
  borderRadius: "0.2rem"
}

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
      defaultSortOrder: "ASCEND",
      render: (name, record: Contact) =>
        record.is_primary ? (
          <>
            <span style={{ marginRight: "0.35em" }}>{name}</span>
            <span style={contactPrimaryTagStyles}>primair</span>
          </>
        ) : (
          name
        )
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
      header: "Cursusdatum",
      dataIndex: "course_date",
      sorter: createDateSorter<Contact>("course_date"),
      render: (value) => (value ? formatDate(value) : "")
    },
    {
      header: "Acties",
      dataIndex: "actions",
      render: (_, record: Contact) => (
        <div style={{ display: "flex", gap: "0.8rem" }}>
          <CopyEmailButton email={record.email} name={record.fullname} />
          <EditHoaContact
            hoaId={hoaId}
            contact={record}
            label={`Bewerk ${record.fullname}`}
          />
          <DeleteHoaContact
            hoaId={hoaId}
            contact={record}
            label={`Verwijder ${record.fullname}`}
          />
        </div>
      )
    }
  ] as ColumnType<Contact>[]

  return (
    <>
      <AddHoaContact hoaId={hoaId} />
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
