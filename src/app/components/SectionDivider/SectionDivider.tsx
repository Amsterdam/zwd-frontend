import { Row } from "@amsterdam/design-system-react"
import styled from "styled-components"

type Props = {
  text?: string
}

const Wrapper = styled(Row)`
  margin: 32px 0;
  padding-bottom: 4px;
  border-bottom: 1px solid #b4b4b4;
  color: rgb(118, 118, 118);
  font-size: 14px;
  font-weight: 700;
`

export const SectionDivider: React.FC<Props> = ({ text = "" }) => (
  <Wrapper>{text}</Wrapper>
)
