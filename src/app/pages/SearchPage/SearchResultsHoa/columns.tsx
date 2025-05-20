import { LinkButton } from "app/components"

const columns = [
  {
    header: "Vve statutaire naam",
    dataIndex: "brkVveStatutaireNaam"
  },
  {
    header: "",
    dataIndex: "votIdentificatie",
    width: 80,
    render: () => <LinkButton label="Bekijk" path="" /> // onClickRow is overruling the  link
  }
]

export default columns
