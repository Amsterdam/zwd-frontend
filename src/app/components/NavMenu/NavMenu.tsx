import { PageMenu } from "@amsterdam/design-system-react"
import { SearchIcon } from "@amsterdam/design-system-react-icons"
import { useLinkClickHandler, useHref } from "react-router-dom" 
import { styled } from "styled-components"

type MenuItem = {
  label: string
  path: string
  icon?: React.ComponentType
}

const StyledPageMenuLink = styled(PageMenu.Link)`
  font-size: var(--ams-text-level-5-font-size);
`

const menuItems: MenuItem[] = [
  { label: "Zoeken", path: "/", icon: SearchIcon },
  { label: "VVE", path: "vve", icon: SearchIcon },
  { label: "Zakenoverzicht", path: "/zaken" },
  { label: "Takenoverzicht", path: "/taken" },
  { label: "BPMN", path: "/bpmn" }
]

const NavMenuItem: React.FC<MenuItem> = ({ label, path, icon }) => {
  const handleClick = useLinkClickHandler(path)
  const href = useHref(path)
  return (
    <StyledPageMenuLink href={ href } icon={ icon } onClick={ handleClick }>
      { label }
    </StyledPageMenuLink>
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
