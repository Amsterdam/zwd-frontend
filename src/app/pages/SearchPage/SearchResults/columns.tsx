import { LinkButton } from "app/components"

const columns = [
  {
    header: "Adres",
    dataIndex: "weergavenaam",
    minWidth: 100
  },
  {
    header: "",
    dataIndex: "adresseerbaarobject_id",
    minWidth: 140,
    render: () => <LinkButton label="Bekijk" path="" /> // onClickRow is overruling the  link
  }
]

export default columns
