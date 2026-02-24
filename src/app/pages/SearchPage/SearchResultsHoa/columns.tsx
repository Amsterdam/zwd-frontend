import { ColumnType, LinkButton } from "app/components"

const columns: ColumnType<HomeownerAssociationSearch>[] = [
  {
    header: "VvE statutaire naam",
    dataIndex: "brkVveStatutaireNaam"
  },
  {
    header: "",
    dataIndex: "votIdentificatie",
    width: 80,
    render: (votIdentificatie) => (
      <LinkButton
        label="Bekijk"
        to={`/adres/${votIdentificatie}`}
        onClick={() => {}}
      />
    ) // onClickRow is overruling the  link
  }
]

export default columns
