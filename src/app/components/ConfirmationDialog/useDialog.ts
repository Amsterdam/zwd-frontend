import { Dialog } from "@amsterdam/design-system-react"

export const useDialog = (id: string) => {
  const openDialog = () => {
    Dialog.open(`#${ id }`)
  }
  
  const closeDialog = () => (
    Dialog.close
  )
    
  return { openDialog, closeDialog }
}
