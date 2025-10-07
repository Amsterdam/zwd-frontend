import React, { useContext } from "react"
import { Field, Label } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import { useAdvisorsList } from "app/state/rest"
import { MultiSelectField } from "app/components/MultiSelectField/MultiSelectField"

type Props = {
  onChangeFilter: (value: string[]) => void
  contextName: "cases" | "tasks"
}

export const AdvisorFilter: React.FC<Props> = ({
  contextName,
  onChangeFilter
}) => {
  const { advisor } = useContext(ContextValues)[contextName]
  const [advisors] = useAdvisorsList()

  const options: Option[] =
    advisors?.map((adv) => ({
      value: String(adv.id),
      label: String(adv.name)
    })) || []

  return (
    <Field>
      <Label htmlFor="advisor">Adviseurs</Label>
      <MultiSelectField
        onChange={onChangeFilter}
        value={advisor}
        options={options}
        placeholder="Selecteer adviseurs"
      />
    </Field>
  )
}

export default AdvisorFilter
