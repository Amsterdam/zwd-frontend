import {
  ColumnType,
  createNumberSorter,
  createDateSorter,
  createStringSorter,
  getSortOrder,
  LinkButton
} from "app/components"
import { formatDate } from "app/utils/dates"

export const getColumns = (
  sorting: TABLE.Sorting
): ColumnType<Components.Schemas.CaseUserTaskList>[] => [
  {
    header: "ID",
    dataIndex: "case.prefixed_dossier_id",
    sorter: createNumberSorter<Components.Schemas.CaseUserTaskList>("case.prefixed_dossier_id"),
    sortOrder: getSortOrder(sorting, "case.prefixed_dossier_id")
  },
  {
    header: "Vve statutaire naam",
    dataIndex: "case.homeowner_association.name",
    sorter: createStringSorter<Components.Schemas.CaseUserTaskList>("case.homeowner_association.name"),
    sortOrder: getSortOrder(sorting, "case.homeowner_association.name")
  },
  {
    header: "Vve grootte",
    dataIndex: "case.homeowner_association.number_of_apartments",
    sorter: createNumberSorter<Components.Schemas.CaseUserTaskList>("case.homeowner_association.number_of_apartments"),
    sortOrder: getSortOrder(sorting, "case.homeowner_association.number_of_apartments")
  },
  {
    header: "Stadsdeel",
    dataIndex: "case.homeowner_association.district",
    sorter: createStringSorter<Components.Schemas.CaseUserTaskList>("case.homeowner_association.district"),
    sortOrder: getSortOrder(sorting, "case.homeowner_association.district"),
  },
  {
    header: "Buurt",
    dataIndex: "case.homeowner_association.neighborhood",
    sorter: createStringSorter<Components.Schemas.CaseUserTaskList>("case.homeowner_association.neighborhood"),
    sortOrder: getSortOrder(sorting, "case.homeowner_association.neighborhood"),
  },
  {
    header: "Aanvraagtype",
    dataIndex: "case.application_type",
    sorter: createStringSorter<Components.Schemas.CaseUserTaskList>("case.application_type"),
    sortOrder: getSortOrder(sorting, "case.application_type"),
    render: (text) => text || "–"
  },
  {
    header: "Adviestype",
    dataIndex: "case.advice_type",
    sorter: createStringSorter<Components.Schemas.CaseUserTaskList>("case.advice_type"),
    sortOrder: getSortOrder(sorting, "case.advice_type"),
    render: (text) => text || "–"
  },
  {
    header: "Adviseur",
    dataIndex: "case.advisor",
    sorter: createStringSorter<Components.Schemas.CaseUserTaskList>("case.advisor"),
    sortOrder: getSortOrder(sorting, "case.advisor"),
    render: (text) => text || "–"
  },
  {
    header: "Open taak",
    dataIndex: "name",
    sorter: createStringSorter<Components.Schemas.CaseUserTaskList>("name"),
    sortOrder: getSortOrder(sorting, "name")
  },
  {
    header: "Aangemaakt",
    dataIndex: "created",
    width: 130,
    sorter: createDateSorter<Components.Schemas.CaseUserTaskList>("created"),
    defaultSortOrder: "DESCEND" as const,
    sortOrder: getSortOrder(sorting, "created"),
    render: (text) => formatDate(text, true)
  },
  {
    header: "",
    dataIndex: "case.id",
    width: 100,
    render: (caseId) => (
      <LinkButton
        label="Zaakdetails"
        to={`/zaken/${caseId}`}
        onClick={() => {}}
      />
    )
  }
]

export default getColumns
