import { Dialog } from "@amsterdam/design-system-react"

export const useConfirmDialog = (id: string) => {
  const openDialog = () => {
    Dialog.open(`#${ id }`)
  }
  
  const closeDialog = () => (
    Dialog.close
  )
    
  return { openDialog, closeDialog }
}
