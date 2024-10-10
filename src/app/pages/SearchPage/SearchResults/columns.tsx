import { LinkButton } from "app/components"

const columns = [
  {
    header: "Adres",
    dataIndex: "weergavenaam"
  },
  {
    header: "",
    dataIndex: "adresseerbaarobject_id",
    width: 80,
    render: () => <LinkButton label="Bekijk" path="" /> // onClickRow is overruling the  link
  }
]

export default columns
