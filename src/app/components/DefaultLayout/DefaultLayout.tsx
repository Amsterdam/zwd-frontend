import { Outlet } from "react-router-dom"
import {
  Header,
  SkipLink,
  Screen,
  LinkList
} from "@amsterdam/design-system-react"
import { User } from "app/components"
import { env } from "app/config/env"
import { useRedirectFromState } from "app/hooks"

import styles from "./styles.module.css"

export const DefaultLayout: React.FC = () => {
  useRedirectFromState()

  return (
    <>
      <SkipLink href="#main">Direct naar inhoud</SkipLink>
      <Screen maxWidth="wide">
        <Header
          // eslint-disable-next-line template-curly-spacing
          brandName={`${env.VITE_APP_TITLE} ${env.VITE_ENV}`}
          className={styles.header}
          menuItems={[
            <Header.MenuLink key="BPMN" href="/bpmn">
              BPMN
            </Header.MenuLink>,
            <Header.MenuLink key="Takenoverzicht" href="/taken">
              Takenoverzicht
            </Header.MenuLink>,
            <Header.MenuLink key="Zakenoverzicht" href="/zaken">
              Zakenoverzicht
            </Header.MenuLink>,
            <Header.MenuLink key="Zoeken" href="/">
              Zoeken
            </Header.MenuLink>,
            <User key="User" />
          ]}
          noMenuButtonOnWideWindow
        >
          <LinkList className="ams-mb--lg">
            <LinkList.Link href="/bpmn">BPMN</LinkList.Link>
            <LinkList.Link href="/taken">Takenoverzicht</LinkList.Link>
            <LinkList.Link href="/zakenoverzicht">Zakenoverzicht</LinkList.Link>
            <LinkList.Link href="/">Zoeken</LinkList.Link>
          </LinkList>
        </Header>
        <main id="main">
          <Outlet />
        </main>
      </Screen>
    </>
  )
}

export default DefaultLayout
