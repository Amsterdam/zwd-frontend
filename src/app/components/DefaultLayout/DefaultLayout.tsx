import { Outlet } from "react-router-dom"
import { Header, SkipLink, Screen } from "@amsterdam/design-system-react"
import { User } from "app/components"
import { env } from "app/config/env"
import { useRedirectFromState } from "app/hooks"
import { NavMenuItems, LinklistMenu } from "app/components"

import styles from "./styles.module.css"

export const DefaultLayout: React.FC = () => {
  useRedirectFromState()

  return (
    <>
      <SkipLink href="#main">Direct naar inhoud</SkipLink>
      <Screen maxWidth="wide">
        <Header
          brandName={`${env.VITE_APP_TITLE} ${env.VITE_ENV}`}
          className={styles.header}
          menuItems={[...NavMenuItems, <User key="User" />]}
          noMenuButtonOnWideWindow
        >
          <LinklistMenu />
        </Header>
        <main id="main">
          <Outlet />
        </main>
      </Screen>
    </>
  )
}

export default DefaultLayout
