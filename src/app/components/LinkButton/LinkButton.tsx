import { LinkList } from "@amsterdam/design-system-react"
import { useHref, useLinkClickHandler } from "react-router-dom"

type Props = {
  label: string
  to?: string
  onClick?: () => void
}

export const LinkButton: React.FC<Props> = ({ label, to = "", onClick }) => {
  const href = useHref(to)
  const routerClickHandler = useLinkClickHandler(to)

  const handleClick  = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onClick?.()
  }

  // If onClick is passed. Link must be used as button.
  const clickHandler = onClick ? handleClick  : routerClickHandler

  return (
    <LinkList>
      <LinkList.Link href={href} onClick={clickHandler}>
        {label}
      </LinkList.Link>
    </LinkList>
  )
}

export default LinkButton
