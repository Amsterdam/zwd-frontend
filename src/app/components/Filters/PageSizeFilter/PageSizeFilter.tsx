import React, { useContext } from "react"
import { Field, Label, Select } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"

type Props = {
  onChangePageSize: (value: string) => void
  contextName: "cases" | "tasks"
}

const PAGE_SIZES = [10, 25, 100]

export const PageSizeFilter: React.FC<Props> = ({ contextName, onChangePageSize }) => {
  const { pagination } = useContext(ContextValues)[contextName]

  const onPageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pageSize = e.currentTarget.value
    onChangePageSize(pageSize)
  }

  return (
    <Field>
      <Label htmlFor="resultaten per pagina">Resultaten per pagina</Label>
      <Select onChange={onPageSizeChange} value={pagination.pageSize}>
        {PAGE_SIZES.map((size) => (
          <Select.Option key={size} value={size}>
            {size}
          </Select.Option>
        ))}
      </Select>
    </Field>
  )
}

export default PageSizeFilter
