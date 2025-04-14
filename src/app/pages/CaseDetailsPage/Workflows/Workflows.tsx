import { useWorkflows } from "app/state/rest"
import { Table, SmallSkeleton } from "app/components"
import getColumns from "./columns"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

export const Workflows: React.FC<Props> = ({ caseId }) => {
  const [data, { isBusy }] = useWorkflows(caseId)
  const workflows = data ?? ([] as Components.Schemas.CaseWorkflow[])
  const columns = getColumns(caseId)

  if (isBusy) {
    return <SmallSkeleton height={4} />
  }
  return (
    <div style={{ marginTop: 16, marginBottom: 32 }}>
      {workflows?.length > 0 ? (
        workflows.map(({ id, tasks = [] }) => (
          <div key={`${id}`} style={{ marginBottom: 10 }}>
            <Table
              columns={columns}
              data={tasks as CustomCaseUserTask[]}
              pagination={false}
              emptyPlaceholder="Geen taken beschikbaar."
            />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  )
}

export default Workflows
