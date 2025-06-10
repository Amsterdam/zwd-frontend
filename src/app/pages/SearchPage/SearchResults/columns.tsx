import { ColumnType, LinkButton } from "app/components"

const columns: ColumnType<BAGPdokAddress>[] = [
  {
    header: "Adres",
    dataIndex: "weergavenaam"
  },
  {
    header: "",
    dataIndex: "adresseerbaarobject_id",
    width: 80,
    render: (adresseerbaarobject_id) => (
      <LinkButton label="Bekijk" to={`adres/${adresseerbaarobject_id}`} />
    ) // onClickRow is overruling the  link
  }
]

export default columns
