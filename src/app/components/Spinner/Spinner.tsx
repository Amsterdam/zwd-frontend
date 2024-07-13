import styled from "styled-components"


const StyledSpinner = styled.span<{ size?: number }>`
  width: ${ props => `${ props.size }px` };
  height: ${ props => `${ props.size }px` };
  border: 5px solid #000000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
`

type Props = {
  loading?: boolean
  size?: number
}

export const Spinner: React.FC<Props> = ({ loading = true, size = 48 }) => (
  loading ? <StyledSpinner size={ size } /> : <></>
)
