import { ReactNode } from "react"
import styled from "styled-components"
import { Heading, Icon } from "@amsterdam/design-system-react"
import { CloseIcon } from "@amsterdam/design-system-react-icons"


type Props = {
  title: string
  open: boolean
  onOk?: () => void
  onCancel?: () => void
  children?: ReactNode
}

const Wrapper = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.5); /* Black with opacity */
`

const Container = styled.div`
  background-color: white;
  margin: 15% auto; /* 15% from the top and centered */
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
  max-width: 600px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
`

const Header = styled.div`
  padding: 30px 40px;
`

const StyledIcon = styled(Icon)`
  float: right;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: 0.5;
    text-decoration: none;
  }
`

const Content = styled.div`
  border-top: 1px solid #e0e0e0;
  padding: 40px;
`

export const Modal: React.FC<Props> = ({ title, open, onCancel, children }) => open ? (
  <Wrapper onClick={ onCancel }>
    <Container
      onClick={(e) => {
      // do not close modal if anything inside modal content is clicked
        e.stopPropagation()
      }}
    >
      <Header>
        <StyledIcon
          size="level-5"
          svg={ CloseIcon }
          onClick={ onCancel }
        />
        <Heading size="level-5">{ title }</Heading>
      </Header>
      <Content>
        { children }
      </Content>
    </Container>
  </Wrapper>
) : null

export default Modal
