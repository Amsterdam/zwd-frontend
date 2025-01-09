const hasFormTypeFile = (form: Components.Schemas.CaseUserTask["form"]) => {
  if (form && Array.isArray(form) && form.length > 0) {
    return form.some((item) => (item as { type?: string })?.type === "file")
  }
  return false
}

export default hasFormTypeFile
