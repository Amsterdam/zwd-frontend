import { Dialog } from "@amsterdam/design-system-react"

type VoidFunction = () => void

type DialogHandlers = {
  openDialog: VoidFunction
  closeDialog: VoidFunction
}

export const useDialog = (id: string): DialogHandlers => {
  const openDialog = () => {
    Dialog.open(`#${id}`)
  }

  const closeDialog = Dialog.close as VoidFunction

  return { openDialog, closeDialog }
}
