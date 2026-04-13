import {
  Button,
  DescriptionList,
  Page,
  Paragraph
} from "@amsterdam/design-system-react"
import { LogOutIcon } from "@amsterdam/design-system-react-icons"
import { Spinner, PageHeading, PageGrid } from "app/components"
import { useDecodedToken } from "app/hooks"
import { useAuth } from "react-oidc-context"
import styles from "./AuthPage.module.css"

type WrapperProps = {
  align?: "flex-start"
  children: React.ReactNode
}

const Wrapper: React.FC<WrapperProps> = ({ align, children }) => {
  const alignClass = align === "flex-start" ? styles.alignTop : ""
  return <Page className={`${styles.wrapper} ${alignClass}`}>{children}</Page>
}

export const LoggingInPage: React.FC = () => (
  <Wrapper>
    <div style={{ marginBottom: "1.5rem" }}>
      <Spinner size={48} />
    </div>
    <Paragraph>Even geduld, u wordt automatisch aangemeld.</Paragraph>
  </Wrapper>
)

export const LoggingInErrorPage: React.FC = () => (
  <Wrapper>
    <Paragraph>Inloggen mislukt.</Paragraph>
    <Paragraph>
      Er ging iets mis. Probeer het opnieuw of ververs de pagina.
    </Paragraph>
  </Wrapper>
)

export const AuthPage: React.FC = () => {
  const auth = useAuth()
  const decodedToken = useDecodedToken()

  if (!decodedToken) return null

  return (
    <PageGrid>
      <PageHeading label="Gebruiker gegevens" />
      <DescriptionList>
        <DescriptionList.Term>E-mail</DescriptionList.Term>
        <DescriptionList.Description>
          {decodedToken.email}
        </DescriptionList.Description>
        <DescriptionList.Term>Voornaam</DescriptionList.Term>
        <DescriptionList.Description>
          {decodedToken.given_name}
        </DescriptionList.Description>
        <DescriptionList.Term>Achternaam</DescriptionList.Term>
        <DescriptionList.Description>
          {decodedToken.family_name}
        </DescriptionList.Description>
      </DescriptionList>
      <div>
        <Button
          variant="primary"
          onClick={() => void auth.signoutRedirect()}
          icon={LogOutIcon}
        >
          Uitloggen
        </Button>
      </div>
    </PageGrid>
  )
}
