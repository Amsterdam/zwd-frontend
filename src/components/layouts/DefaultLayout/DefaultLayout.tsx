import { Header, SkipLink, PageMenu, Screen } from "@amsterdam/design-system-react"

type Props = {
  children: React.ReactNode
}

const DefaultLayout: React.FC<Props> = ({ children }) => (
  <>
    <SkipLink href="#main">Direct naar inhoud</SkipLink>
    <Screen maxWidth="wide">
      <Header 
        appName="Zaken Woningkwaliteit en Duurzaamheid" 
        links={<PageMenu alignEnd><PageMenu.Link href="#">Contact</PageMenu.Link><PageMenu.Link href="#">Mijn Amsterdam</PageMenu.Link><PageMenu.Link href="#" icon={function Qa(){}}>Zoeken</PageMenu.Link></PageMenu>}
        menu={<button className="ams-header__menu-button">Menu</button>}
      />
      <main id="main">
        { children }
      </main>
    </Screen>
  </>
)

export default DefaultLayout
