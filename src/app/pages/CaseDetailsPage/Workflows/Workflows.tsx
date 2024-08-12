import { useWorkflows } from "app/state/rest"
import { Table, SmallSkeleton, PageHeading } from "app/components"
import { styled } from "styled-components"
import getColumns from "./columns"


type Props = {
  caseId: Components.Schemas.Case["id"]
}

const Wrapper = styled.div`
  margin-bottom: 32px;
`

const TableWrapper = styled.div`
  margin-bottom: 10px;
`

export const Workflows: React.FC<Props> = ({ caseId }) => {
  const [data, { isBusy }] = useWorkflows(caseId)
  const workflows = data ?? []
  const columns = getColumns(caseId)

  if (isBusy) {
    return <SmallSkeleton height={ 4 } />
  }
  return (
    <Wrapper>
      <PageHeading label="Open taken" level={ 4 } />
      { workflows?.length > 0 ? (
        workflows.map(({ id, tasks = [] }) => (
          <TableWrapper key={ `${ id }` }>
            <Table
              columns={ columns }             
              data={ tasks }
              pagination={ false }
              emptyPlaceholder="Geen taken beschikbaar."
            />
          </TableWrapper>
        ))
      ) : <></>}
    </Wrapper>
  )
}

export default Workflows
    