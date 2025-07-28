import { SearchIcon } from "@amsterdam/design-system-react-icons"
import { MenuItem } from "./types"

export const menuItems: MenuItem[] = [
  { label: "Zoeken", path: "/zoeken", icon: SearchIcon },
  { label: "Zakenoverzicht", path: "/zaken" },
  { label: "Takenoverzicht", path: "/taken" },
  { label: "BPMN", path: "/bpmn" }
]
