import { SearchIcon } from "@amsterdam/design-system-react-icons"
import { MenuItem } from "./types"

export const menuItems: MenuItem[] = [
  { label: "Zoeken", path: "/zoeken", icon: SearchIcon, core: true },
  { label: "Zakenoverzicht", path: "/zaken", core: true },
  { label: "Takenoverzicht", path: "/taken", core: true },
  { label: "Vve-overzicht", path: "/vve"},
  { label: "Import", path: "/import" },
  { label: "BPMN", path: "/bpmn" }
]
