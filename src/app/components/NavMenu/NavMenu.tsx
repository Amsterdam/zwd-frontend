import { Header, Icon, LinkList } from "@amsterdam/design-system-react"
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
  { label: "Takenoverzicht", path: "/taken" },
  { label: "BPMN", path: "/bpmn" }
]

const NavMenuItem: React.FC<MenuItem> = ({ label, path, icon }) => {
  const handleClick = useLinkClickHandler(path)
  const href = useHref(path)
  return (
    <Header.MenuLink href={href} onClick={handleClick}>
      {icon && <Icon svg={icon} size="level-5" style={{ verticalAlign: "middle", marginRight: "0.5rem" }}/>}
      {label}
    </Header.MenuLink>
  )
}

export const NavMenuItems = menuItems.map((props) => (
  <NavMenuItem key={props.path} {...props} />
))

const LinklistMenuItem: React.FC<MenuItem> = ({ label, path, icon }) => {
  const handleClick = useLinkClickHandler(path)
  const href = useHref(path)
  return (
    <LinkList.Link href={href} icon={icon} onClick={handleClick}>
      {label}
    </LinkList.Link>
  )
}

export const LinklistMenu = () => (
  <LinkList className="ams-mb--lg">
    {menuItems.map((props) => (
      <LinklistMenuItem key={props.path} {...props} />
    ))}
  </LinkList>
)
