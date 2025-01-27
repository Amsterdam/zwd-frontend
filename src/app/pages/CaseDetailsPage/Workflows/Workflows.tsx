import { Heading } from "@amsterdam/design-system-react"
import { styled } from "styled-components"
import { useWorkflows } from "app/state/rest"
import { Table, SmallSkeleton } from "app/components"
import getColumns from "./columns"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const Wrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 32px;
`

const TableWrapper = styled.div`
  margin-bottom: 10px;
`

export const Workflows: React.FC<Props> = ({ caseId }) => {
  const [data, { isBusy }] = useWorkflows(caseId)
  const workflows = data ?? ([] as Components.Schemas.CaseWorkflow[])
  const columns = getColumns(caseId)

  if (isBusy) {
    return <SmallSkeleton height={4} />
  }
  return (
    <Wrapper>
      {workflows?.length > 0 ? (
        workflows.map(({ id, state, tasks = [] }) => (
          <TableWrapper key={`${ id }`}>
            {state?.name ? <Heading level={4}>{state.name}</Heading> : <></>}
            <Table
              columns={columns}
              data={tasks}
              pagination={false}
              emptyPlaceholder="Geen taken beschikbaar."
            />
          </TableWrapper>
        ))
      ) : (
        <></>
      )}
    </Wrapper>
  )
}

export default Workflows
