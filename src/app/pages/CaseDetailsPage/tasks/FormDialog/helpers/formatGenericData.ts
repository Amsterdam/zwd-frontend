import { GenericTaskFormData } from "./types"

const formatGenericData = (form: FormItem[], data: GenericTaskFormData) =>
  form.reduce<GenericTaskFormData>((acc, item) => {
    const key = item.name
    const value = data[key]
    if (value) {
      acc[key] = {
        value: value
      }
    }
    return acc
  }, {})

export default formatGenericData
