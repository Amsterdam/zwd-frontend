import { useWorkflows } from "app/state/rest"
import { Table, SmallSkeleton, ColumnType } from "app/components"
import { styled } from "styled-components"
import { Heading, Icon } from "@amsterdam/design-system-react"
import { TaskOutlined } from "app/components/Table/components/TableHeader/icons"
import dayjs from "dayjs"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const Wrapper = styled.div`

`

const Div = styled.div`
  
`

const columns: ColumnType<Components.Schemas.CaseWorkflow>[] = [
  {
    header: "",
    dataIndex: "id",
    render: () => <Icon svg={ TaskOutlined } />
  }, {
    header: "Open taken",
    dataIndex: "name"
  }, {
    header: "Slotdatum",
    dataIndex: "due_date",
    render: (text) => dayjs(text).format("DD-MM-YYYY")
  }, {
    header: "Verwerking taak",
    dataIndex: "id",
    minWidth: 170
    // render: () => <RouterLink label="Zaakdetails" path="" />
  }
]
  

export const Workflows: React.FC<Props> = ({ caseId }) => {
  const [data, { isBusy }] = useWorkflows(caseId)
  const workflows = data ?? []
  console.log("WORKFLOW", workflows)

  if (isBusy) {
    return <SmallSkeleton height={ 2 } />
  }
  return (
    <>
      { workflows?.length > 0 ? (
        workflows.map(({ id, workflow_type, workflow_message_name, tasks }) => (
          <Wrapper key={ `${ id }` }>
            <Div>
              <Heading level={ 4 }>{ workflow_type }</Heading>
              <p>{ workflow_message_name }</p> 
            </Div>
            <Table
              columns={ columns }
              lastColumnFixed
              data={ tasks || [] }
              pagination={ false }
            />
          </Wrapper>
        ))
      ) : (
        <>Geen taken beschikbaar.</>
      )
      }
    </>
  )
}

export default Workflows
    