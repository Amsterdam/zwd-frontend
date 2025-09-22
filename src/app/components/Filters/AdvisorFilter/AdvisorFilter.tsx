import React, { useContext } from "react"
import { Field, Label, Select } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import { useAdvisorsList } from "app/state/rest"

type Props = {
  onChangeFilter: (value: string) => void
  contextName: "cases" | "tasks"
}

export const AdvisorFilter: React.FC<Props> = ({
  contextName,
  onChangeFilter
}) => {
  const { advisor } = useContext(ContextValues)[contextName]
  const [advisors] = useAdvisorsList()

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(e.currentTarget.value)
  }

  return (
    <Field>
      <Label htmlFor="advisor">Adviseur</Label>
      <Select id="advisor" onChange={onChange} value={advisor}>
        <Select.Option key="" value="">
          Alle adviseurs
        </Select.Option>
        {advisors?.map((advisor: Components.Schemas.CaseAdvisor) => (
          <Select.Option key={advisor.id} value={`${advisor.id}`}>
            {advisor.name}
          </Select.Option>
        ))}
      </Select>
    </Field>
  )
}

export default AdvisorFilter
