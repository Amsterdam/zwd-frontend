import React from "react"
import { Link } from "@amsterdam/design-system-react"
import { useHref, useLinkClickHandler } from "react-router-dom"

type RouterLinkProps = {
  to: string
  children: React.ReactNode
}

export const RouterLink: React.FC<RouterLinkProps> = ({ to, children }) => {
  const href = useHref(to)
  const handleClick = useLinkClickHandler(to)

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  )
}

export default RouterLink
