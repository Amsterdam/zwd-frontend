import { useContext, useMemo } from "react"
import { Dialog, Row, Checkbox, Button } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import type { StateType, Payload } from "app/state/context/types"
import { DEFAULT_COLUMNS as CASES_DEFAULT_COLUMNS } from "app/pages/CasesPage/columns"
import { DEFAULT_COLUMNS as TASKS_DEFAULT_COLUMNS } from "app/pages/TasksPage/columns"
import getCasesColumns from "app/pages/CasesPage/columns"
import getTasksColumns from "app/pages/TasksPage/columns"

type Props = {
  contextName: string
  dialogId: string
  onClose: () => void
}

type ContextData = StateType["cases"] | StateType["tasks"]

const MANDATORY_COLUMNS = [
  "prefixed_dossier_id",
  "case.prefixed_dossier_id",
]

const ACTION_COLUMNS = [
  "id",
  "case.id"
]

export const ColumnSettingsDialog = ({ dialogId, contextName, onClose }: Props) => {
  const contextData = useContext(ContextValues)[contextName as "cases" | "tasks"] as ContextData
  const { columnsVisible } = contextData

  const updateContext = (payload: Payload) => {
    if (contextName === "cases") {
      (contextData as StateType["cases"]).updateContextCases(payload)
    } else {
      (contextData as StateType["tasks"]).updateContextTasks(payload)
    }
  }

  const defaultColumns = contextName === "cases"
    ? CASES_DEFAULT_COLUMNS
    : TASKS_DEFAULT_COLUMNS

  const allColumns = contextName === "cases"
    ? getCasesColumns({ dataIndex: "", order: "DESCEND" })
    : getTasksColumns({ dataIndex: "", order: "DESCEND" })

  const handleSave = () => void onClose()

  const handleColumnToggle = (dataIndex: string, checked: boolean) => {
    const newColumnsVisible = checked
      ? [...columnsVisible, dataIndex]
      : columnsVisible.filter(col => col !== dataIndex)

    updateContext({
      columnsVisible: newColumnsVisible,
    })
  }

  const handleResetToDefaults = () => void updateContext({ columnsVisible: defaultColumns })

  const isMandatoryColumn = (dataIndex: string) => MANDATORY_COLUMNS.includes(dataIndex)
  const isActionColumn = (dataIndex: string) => ACTION_COLUMNS.includes(dataIndex)
  const isDefaultColumns = useMemo(
    () => columnsVisible.every(column => defaultColumns.includes(column)) && columnsVisible.length === defaultColumns.length,
    [columnsVisible, defaultColumns]
  )

  return (
    <Dialog
      heading="Kolomweergave aanpassen"
      id={dialogId}
    >
      <>
        {allColumns.filter(column => !isActionColumn(column.dataIndex || "")).map((column) => {
          const dataIndex = column.dataIndex
          const isMandatory = isMandatoryColumn(dataIndex || "")
          const isChecked = columnsVisible.includes(dataIndex || "")

          if (!dataIndex) {
            return null
          }

          return (
            <Row key={dataIndex} style={{ userSelect: "none" }}>
              <Checkbox
                id={`column-${dataIndex}`}
                checked={isChecked}
                disabled={isMandatory}
                onChange={(e) => handleColumnToggle(dataIndex || "", e.target.checked)}
              >
                {column.header}
                {isMandatory && " (verplicht)"}
              </Checkbox>
            </Row>
          )
        })}

        <Row style={{ marginTop: 24, marginBottom: 32, justifyContent: "space-between" }}>
          <Row>
            <Button
              variant="primary"
              onClick={handleSave}
            >
              Opslaan
            </Button>
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Annuleer
            </Button>
          </Row>

          <Button
            variant="secondary"
            onClick={handleResetToDefaults}
            disabled={isDefaultColumns}
          >
            Standaardinstellingen
          </Button>
        </Row>
      </>
    </Dialog>
  )
}

export default ColumnSettingsDialog
