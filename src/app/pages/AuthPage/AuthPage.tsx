import { Button, Heading, Icon, Screen } from "@amsterdam/design-system-react"
import styled from "styled-components"
import { Spinner, PageHeading, PageGrid } from "app/components"
import { useDecodedToken } from "app/hooks"
import { useAuth } from "react-oidc-context"
import { LogoutIcon } from "@amsterdam/design-system-react-icons"

const Wrapper = styled(Screen)<{ align?: string }>`
  display: flex;
  justify-content: center;
  align-items: ${(props) => props.align ?? "center"};
  flex-direction: column;
`

export const LoggingInPage: React.FC = () => (
  <Wrapper fullHeight>
    <Heading level={4}>U wordt automatisch aangemeld...</Heading>
    <br />
    <Spinner size={48} />
  </Wrapper>
)

export const LoggingInErrorPage: React.FC = () => (
  <Wrapper fullHeight>
    <Heading level={4}>
      Sorry, er is iets fout gegaan tijdens het inloggen.
    </Heading>
  </Wrapper>
)

export const AuthPage: React.FC = () => {
  const auth = useAuth()
  const decodedToken = useDecodedToken()

  return decodedToken ? (
    <PageGrid>
      <PageHeading label="Gebruiker gegevens" />
      {Object.entries(decodedToken).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong>{" "}
          {Array.isArray(value) ? value.join(", ") : value.toString()}
        </div>
      ))}
      <div>
        <Button variant="primary" onClick={() => void auth.removeUser()}>
          Uitloggen
          <Icon size="level-5" svg={LogoutIcon} />
        </Button>
      </div>
    </PageGrid>
  ) : (
    <></>
  )
}
