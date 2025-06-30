import { Button, Heading, Page } from "@amsterdam/design-system-react"
import { Spinner, PageHeading, PageGrid } from "app/components"
import { useDecodedToken } from "app/hooks"
import { useAuth } from "react-oidc-context"
import { LogOutIcon } from "@amsterdam/design-system-react-icons"
import styles from "./AuthPage.module.css"

interface WrapperProps {
  align?: "flex-start"
  children: React.ReactNode
}

const Wrapper: React.FC<WrapperProps> = ({ align, children }) => {
  const alignClass = align === "flex-start" ? styles.alignTop : ""
  return <Page className={`${styles.wrapper} ${alignClass}`}>{children}</Page>
}

export const LoggingInPage: React.FC = () => (
  <Wrapper>
    <Heading level={4}>U wordt automatisch aangemeld...</Heading>
    <br />
    <Spinner size={48} />
  </Wrapper>
)

export const LoggingInErrorPage: React.FC = () => (
  <Wrapper>
    <Heading level={4}>
      Sorry, er is iets fout gegaan tijdens het inloggen.
    </Heading>
  </Wrapper>
)

export const AuthPage: React.FC = () => {
  const auth = useAuth()
  const decodedToken = useDecodedToken()

  if (!decodedToken) return null

  return (
    <PageGrid>
      <PageHeading label="Gebruiker gegevens" />
      {Object.entries(decodedToken).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong>{" "}
          {Array.isArray(value) ? value.join(", ") : value.toString()}
        </div>
      ))}
      <div>
        <Button
          variant="primary"
          onClick={() => void auth.removeUser()}
          icon={LogOutIcon}
        >
          Uitloggen
        </Button>
      </div>
    </PageGrid>
  )
}
