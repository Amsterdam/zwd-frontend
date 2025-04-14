const hasFormType = (form: FormItem[], type: string = "file") => {
  if (form && Array.isArray(form) && form.length > 0) {
    return form.some((item) => (item as { type?: string })?.type === type)
  }
  return false
}

export default hasFormType
