import { PageMenu } from "@amsterdam/design-system-react"
import { SearchIcon } from "@amsterdam/design-system-react-icons"
import { useLinkClickHandler } from "react-router-dom" 

export const NavMenu: React.FC = () => {
  const handleHomeClick = useLinkClickHandler("/")
  const handleZakenClick = useLinkClickHandler("/zaken")
  const handleTakenClick = useLinkClickHandler("/taken")
  
  return (
    <PageMenu>
      <PageMenu.Link icon={ SearchIcon } onClick={ handleHomeClick }>
        Zoeken
      </PageMenu.Link>
      <PageMenu.Link onClick={ handleZakenClick }>
        Zakenoverzicht
      </PageMenu.Link>
      <PageMenu.Link onClick={ handleTakenClick }>
        Takenoverzicht
      </PageMenu.Link>
    </PageMenu>
  )
}

export default NavMenu
