import React, { useContext } from "react"
import { Field, Label, Select } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"

const PAGE_SIZES = [10, 25, 100]

export const PageSizeFilter: React.FC = () => {
  const { pagination, updateContextCases } = useContext(ContextValues)["cases"]

  const onChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pageSize = e.currentTarget.value
    updateContextCases({
      pagination: {
        ...pagination,
        pageSize: parseInt(pageSize),
        page: 1
      }
    })
  }

  return (
    <Field>
      <Label htmlFor="resultaten per pagina">Resultaten per pagina</Label>
      <Select onChange={onChangePageSize} value={pagination.pageSize}>
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
