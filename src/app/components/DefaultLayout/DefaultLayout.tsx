import { Outlet } from "react-router-dom"
import { PageHeader, SkipLink, Page } from "@amsterdam/design-system-react"
import { env } from "app/config/env"
import { useRedirectFromState } from "app/hooks"
import { NavMenuItems, LinklistMenu } from "app/components"
import CaseTitleUpdater from "app/routing/components/CaseTitleUpdater"

export const DefaultLayout: React.FC = () => {
  useRedirectFromState()

  const brandName = `${env.VITE_APP_TITLE}${env.VITE_DISPLAY_ENV === "true" ? ` ${env.VITE_ENV}` : ""}`

  return (
    <>
      <CaseTitleUpdater />
      <SkipLink href="#main">Direct naar inhoud</SkipLink>
      <Page>
        <PageHeader
          brandName={brandName}
          menuItems={NavMenuItems}
          noMenuButtonOnWideWindow
        >
          <LinklistMenu />
        </PageHeader>
        <main id="main">
          <Outlet />
        </main>
      </Page>
    </>
  )
}

export default DefaultLayout
