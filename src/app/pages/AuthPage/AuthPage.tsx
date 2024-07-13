import { Heading, Screen } from "@amsterdam/design-system-react"
import styled from "styled-components"
import { Spinner } from "app/components"
import { useDecodedToken } from "app/hooks"

const Wrapper = styled(Screen)<{ align?: string }>`
  display: flex;
  justify-content: center;
  align-items: ${ props => props.align ?? "center" };
  flex-direction: column;
`

export const LoggingInPage: React.FC = () => (
  <Wrapper fullHeight>
    <Heading level={4}>U wordt automatisch aangemeld...</Heading>
    <Spinner />
  </Wrapper>
)

export const LoggingInErrorPage: React.FC = () => (
  <Wrapper fullHeight>
    <Heading level={4}>Sorry, er is iets fout gegaan tijdens het inloggen.</Heading>
  </Wrapper>
)

export const AuthPage: React.FC = () => {
  const decodedToken = useDecodedToken()

  return decodedToken ? (
    <Wrapper fullHeight align="left">
      <Heading level={4}>Gebruiker gegevens</Heading>
      {Object.entries(decodedToken).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value.toString()}
        </div>
      ))}
    </Wrapper>
  ) : <></>
}
