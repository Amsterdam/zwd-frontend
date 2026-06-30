import { useWorkflowInstances } from "app/state/rest"
import { Table, SmallSkeleton } from "app/components"
import columns from "./columns"
import { Paragraph } from "@amsterdam/design-system-react"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

export const WorkflowInstances: React.FC<Props> = ({ caseId }) => {
  const [data, { isBusy }] = useWorkflowInstances(caseId)

  if (isBusy) {
    return <SmallSkeleton height={4} />
  }
  return (
    <div style={{ marginTop: 16, marginBottom: 32 }}>
      <Paragraph style={{ marginBottom: 16 }}>
        Dit overzicht toont alle processen die op deze zaak zijn gestart,
        inclusief afgeronde processen. Via het menu (BPMN) bekijk je het
        procesmodel en de vervolgstappen in de BPMN-viewer.
      </Paragraph>
      <Table
        columns={columns}
        data={data}
        pagination={false}
        emptyPlaceholder="Geen workflow processen beschikbaar."
      />
    </div>
  )
}

export default WorkflowInstances
