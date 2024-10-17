import { type HTMLAttributes, type ReactNode } from "react"
import { Column, Row } from "@amsterdam/design-system-react"


type FieldLayoutProps = {
  children: ReactNode
} & HTMLAttributes<HTMLDivElement>

const FieldHorizontalLayout = ({ children, ...props }: FieldLayoutProps): JSX.Element => (
  <Row {...props}>{children}</Row>
)

const FieldVerticalLayout = ({ children, ...props }: FieldLayoutProps): JSX.Element => (
  <Column gap="extra-small" {...props}>
    {children}
  </Column>
)

export { FieldHorizontalLayout, FieldVerticalLayout }
