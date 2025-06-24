import { LinkList } from "@amsterdam/design-system-react"
import { useLinkClickHandler, useHref } from "react-router-dom"
import { menuItems } from "./menuItems"
import { MenuItem } from "./types"

const LinklistMenuItem = ({ label, path, icon }: MenuItem) => {
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
    {menuItems.map((item) => (
      <LinklistMenuItem key={item.path} {...item} />
    ))}
  </LinkList>
)
