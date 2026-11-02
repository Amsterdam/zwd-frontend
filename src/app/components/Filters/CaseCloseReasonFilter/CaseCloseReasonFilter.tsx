import React, { useContext } from "react"
import { Field, Label } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import { useCaseCloseReasons } from "app/state/rest"
import { MultiSelectField } from "app/components/MultiSelectField/MultiSelectField"

type Props = {
  onChangeFilter: (value: string[]) => void
}

export const CaseCloseReasonFilter: React.FC<Props> = ({ onChangeFilter }) => {
  const { caseCloseReason } = useContext(ContextValues)["cases"]
  const [reasons] = useCaseCloseReasons()

  const options: Option[] =
    reasons?.map((reason) => ({
      value: String(reason.id),
      label: reason.name
    })) || []

  return (
    <Field>
      <Label htmlFor="caseCloseReason">Reden sluiting</Label>
      <MultiSelectField
        onChange={onChangeFilter}
        value={caseCloseReason}
        options={options}
        placeholder="Selecteer redenen"
      />
    </Field>
  )
}

export default CaseCloseReasonFilter
