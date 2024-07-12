import { PageMenu } from "@amsterdam/design-system-react"
import { SearchIcon } from "@amsterdam/design-system-react-icons"
import { Link } from "react-router-dom" 

export const NavMenu: React.FC = () => (
  <PageMenu>
    <Link to="/zoeken" >
      <PageMenu.Link icon={ SearchIcon }>Zoeken</PageMenu.Link>
    </Link>
    <Link to="/zaken" >
      <PageMenu.Link>Zakenoverzicht</PageMenu.Link>
    </Link>
    <Link to="/taken" >
      <PageMenu.Link href="/taken">Takenoverzicht</PageMenu.Link>
    </Link>
  </PageMenu>
)

export default NavMenu
