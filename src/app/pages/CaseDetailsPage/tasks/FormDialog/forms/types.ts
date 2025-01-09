export type FormItem = {
    type: string
    name: string
    label: string
    required?: boolean
    options?: { value: string, label: string }[]
    tooltip?: string
  }
  
type Value = boolean | string | object | Blob | File[] | FileList
  
export type GenericTaskFormData = Record<string, Value>
