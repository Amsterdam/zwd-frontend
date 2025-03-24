import { Header, Icon } from "@amsterdam/design-system-react"
import { PersonalLoginIcon } from "@amsterdam/design-system-react-icons"
import { useAuth } from "react-oidc-context"
import { useNavigate } from "react-router-dom"
import { useDecodedToken } from "app/hooks"

export const User: React.FC = () => {
  const auth = useAuth()
  const decodedToken = useDecodedToken()
  const navigate = useNavigate()

  return auth.isAuthenticated ? (
    <Header.MenuLink onClick={() => void navigate("/auth")} fixed>
      {decodedToken?.given_name}
      <Icon
        style={{ paddingInlineStart: ".5rem ", blockSize: ".8em" }}
        size="level-5"
        svg={PersonalLoginIcon}
      />
    </Header.MenuLink>
  ) : (
    <></>
  )
}

export default User
