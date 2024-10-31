export const downloadFile = (file: BlobPart, name: string) => {
  const url = window.URL.createObjectURL(new Blob([file]))
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", name)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)  
}

export const viewFile = (file: BlobPart) => {
  const url = window.URL.createObjectURL(new Blob([file]))
  window.open(url, "_blank")
}
