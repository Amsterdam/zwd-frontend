import { LinkList } from "@amsterdam/design-system-react"
import { useLinkClickHandler, useHref } from "react-router-dom"

type Props = {
  label: string
  path?: string
  onClick?: () => void
}

export const LinkButton: React.FC<Props> = ({ label, path = "", onClick }) => {
  const onRouterClick = useLinkClickHandler(path)
  const href = useHref(path)

  const onHandleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    if (onClick) {
      onClick()
    }
  }

  // If onClick is passed. Link must be used as button.
  const onClickLink = onClick ? onHandleButtonClick : onRouterClick

  return (
    <LinkList>
      <LinkList.Link href={href} onClick={onClickLink}>
        {label}
      </LinkList.Link>
    </LinkList>
  )
}

export default LinkButton
