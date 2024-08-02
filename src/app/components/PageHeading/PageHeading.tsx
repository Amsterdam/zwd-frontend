import { Heading, Icon, IconProps } from "@amsterdam/design-system-react"
import styled from "styled-components"

type Props = {
  label: string
  icon?: IconProps["svg"]
}

const LEVEL = 4

const Wrapper = styled.span`
  display: flex;  
`

const StyledIcon = styled(Icon)`
  margin-right: 0.5rem;
`

export const PageHeading: React.FC<Props> = ({ label, icon }) =>  (
  <Wrapper>
    { icon && <StyledIcon svg={icon} /> }
    <Heading level={ LEVEL } >
      { label }
    </Heading>
  </Wrapper>
)

export default PageHeading
