import { Row } from "@amsterdam/design-system-react"
import styles from "./SectionDivider.module.css"

type Props = {
  text?: string
}

export const SectionDivider: React.FC<Props> = ({ text = "" }) => (
  <Row className={styles.wrapper}>{text}</Row>
)
