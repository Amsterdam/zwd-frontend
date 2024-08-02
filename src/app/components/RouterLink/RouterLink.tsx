import { LinkList } from "@amsterdam/design-system-react"
import { useLinkClickHandler, useHref } from "react-router-dom" 


type Props = {
  label: string
  path: string
}

export const RouterLink: React.FC<Props> = ({ label, path }) => {
  const handleClick = useLinkClickHandler(path)
  const href = useHref(path)

  return (
    <LinkList>
      <LinkList.Link
        href={ href } 
        onClick={ handleClick }
        size="small"
      >
        { label }
      </LinkList.Link>
    </LinkList>
  )
}

export default RouterLink
