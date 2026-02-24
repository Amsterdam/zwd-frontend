import type { ColumnType } from "app/components"
import {
  createNumberSorter,
  createStringSorter,
  getSortOrder,
  LinkButton
} from "app/components"

type DataType = Components.Schemas.CaseList

export const DEFAULT_COLUMNS = ["name"]

const getColumns = (sorting: TABLE.Sorting): ColumnType<DataType>[] => [
  {
    header: "Statutaire naam",
    dataIndex: "name",
    sorter: createStringSorter<DataType>("name"),
    sortOrder: getSortOrder(sorting, "name")
  },
  {
    header: "Appartementen",
    dataIndex: "number_of_apartments",
    sorter: createNumberSorter<DataType>("number_of_apartments"),
    sortOrder: getSortOrder(sorting, "number_of_apartments")
  },
  {
    header: "Stadsdeel",
    dataIndex: "district",
    sorter: createStringSorter<DataType>("district"),
    sortOrder: getSortOrder(sorting, "district")
  },
  {
    header: "Buurt",
    dataIndex: "neighborhood",
    sorter: createStringSorter<DataType>("neighborhood"),
    sortOrder: getSortOrder(sorting, "neighborhood")
  },
  {
    header: "Cursisten",
    dataIndex: "course_participant_count",
    sorter: createNumberSorter<DataType>("course_participant_count"),
    sortOrder: getSortOrder(sorting, "course_participant_count")
  },
  {
    header: "Brieven",
    dataIndex: "letter_count",
    sorter: createNumberSorter<DataType>("letter_count"),
    sortOrder: getSortOrder(sorting, "letter_count")
  },
  {
    header: "Advies",
    dataIndex: "advice_cases_count",
    sorter: createNumberSorter<DataType>("advice_cases_count"),
    sortOrder: getSortOrder(sorting, "advice_cases_count"),
  },
  {
    header: "Activatieteam",
    dataIndex: "activationteam_cases_count",
    sorter: createNumberSorter<DataType>("activationteam_cases_count"),
    sortOrder: getSortOrder(sorting, "activationteam_cases_count")
  },
  {
      header: "",
      dataIndex: "id",
      width: 110,
      render: (hoaId) => (
        <LinkButton
          label="VvE-details"
          to={`/vve/${hoaId}`}
          onClick={() => {}}
        />
      )
    }
]

export default getColumns
