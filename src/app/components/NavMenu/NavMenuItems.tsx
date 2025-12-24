import { PageHeader, Icon } from "@amsterdam/design-system-react"
import { PersonIcon } from "@amsterdam/design-system-react-icons"
import { useLinkClickHandler, useHref } from "react-router-dom"
import { useAuth } from "react-oidc-context"
import { useDecodedToken } from "app/hooks"
import { menuItems } from "./menuItems"
import type { MenuItem } from "./types"

const NavMenuItem = ({ label, path, icon, fixed, core }: MenuItem) => {
  const handleClick = useLinkClickHandler(path)
  const href = useHref(path)

  return (
    <PageHeader.MenuLink href={href} onClick={handleClick} fixed={fixed} data-core={core}>
      {icon && (
        <Icon
          svg={icon}
          style={{ verticalAlign: "middle", marginRight: "0.5rem" }}
        />
      )}
      {label}
    </PageHeader.MenuLink>
  )
}

const User = () => {
  const auth = useAuth()
  const decodedToken = useDecodedToken()

  if (!auth.isAuthenticated) return null

  return (
    <NavMenuItem
      key={"/auth"}
      label={decodedToken?.given_name}
      path="/auth"
      icon={PersonIcon}
      fixed
    />
  )
}

export const NavMenuItems = [
  ...menuItems.map((item) => <NavMenuItem key={item.path} {...item} />),
  <User key="user" />
]
