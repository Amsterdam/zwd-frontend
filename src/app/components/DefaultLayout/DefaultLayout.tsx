import { Outlet } from "react-router-dom"
import { Header, SkipLink, PageMenu, Screen } from "@amsterdam/design-system-react"
import { User, NavMenu } from "app/components"
import { env } from "app/config/env"


export const DefaultLayout: React.FC = () => (
  <>
    <SkipLink href="#main">Direct naar inhoud</SkipLink>
    <Screen maxWidth="wide">
      <Header 
        appName={`${ env.VITE_APP_TITLE }`}
        links={(
          <PageMenu alignEnd>
            <li><User/></li>
          </PageMenu>
        )}
      />
      <NavMenu />
      <main id="main">
        <Outlet />
      </main>
    </Screen>
  </>
)

export default DefaultLayout
