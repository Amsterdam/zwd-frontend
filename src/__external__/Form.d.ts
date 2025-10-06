type Option = {
  value: string | number
  label: string
}

type FormItem = {
  type: string
  name: string
  label: string
  required?: boolean
  options?: Option[]
  tooltip?: string
}

type CustomCaseUserTask = Omit<Components.Schemas.CaseUserTask, "form"> & {
  form?: FormItem[] // Form is generated as null
}
