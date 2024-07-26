import { PageMenu } from "@amsterdam/design-system-react"
import { SearchIcon } from "@amsterdam/design-system-react-icons"
import { useLinkClickHandler, useHref } from "react-router-dom" 

type MenuItem = {
  label: string
  path: string
  icon?: React.ComponentType
}

const menuItems: MenuItem[] = [
  { label: "Zoeken", path: "/", icon: SearchIcon },
  { label: "Zakenoverzicht", path: "/zaken" },
  { label: "Takenoverzicht", path: "/taken" }
]

const NavMenuItem: React.FC<MenuItem> = ({ label, path, icon }) => {
  const handleClick = useLinkClickHandler(path)
  const href = useHref(path)
  return (
    <PageMenu.Link href={ href } icon={ icon } onClick={ handleClick }>
      { label }
    </PageMenu.Link>
  )
}

export const NavMenu = () => (
  <PageMenu>
    { menuItems.map((props) => (
      <NavMenuItem key={ props.path } {...props} />
    ))}
  </PageMenu>
)

export default NavMenu
