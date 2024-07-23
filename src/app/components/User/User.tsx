import styled from "styled-components"
import { Icon } from "@amsterdam/design-system-react"
import { PersonalLoginIcon } from "@amsterdam/design-system-react-icons"
import { useAuth } from "react-oidc-context"
import { useNavigate } from "react-router-dom"  
import { useDecodedToken } from "app/hooks" 

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--ams-page-menu-item-font-size);
`

const StyledIcon = styled(Icon)`
  margin-right: 0.5rem;
`

export const User: React.FC = () => {
  const auth = useAuth()
  const decodedToken = useDecodedToken()
  const navigate = useNavigate()

  return auth.isAuthenticated ? (
    <Wrapper onClick={() => navigate("/auth")} >
      <StyledIcon
        size="level-5"
        svg={ PersonalLoginIcon }
      />
      { decodedToken?.given_name }
    </Wrapper>
  ) : <></>
}

export default User
