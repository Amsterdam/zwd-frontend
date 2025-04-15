import styled, { keyframes } from "styled-components"

type Props = {
  loading?: boolean
  size?: number
  color?: string
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SpinnerWrapper = styled.div<{ size: number }>`
  display: inline-block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  svg {
    width: 100%;
    height: 100%;
    animation: ${rotate} 1s linear infinite;
  }
`

export const Spinner: React.FC<Props> = ({
  loading = true,
  size = 32,
  color = "#000000"
}) =>
  loading ? (
    <SpinnerWrapper size={size}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path
          d="M16.3 5c2.2 0 4.3.7 6.1 1.9 1.8 1.2 3.2 3 4 5 .8 2 1 4.2.6 6.4-.4 2.1-1.5 4.1-3.1 5.6s-3.5 2.6-5.7 3c-2.1.4-4.3.2-6.3-.7-2-.9-3.7-2.3-4.9-4.1-1.2-1.8-1.8-4-1.8-6.1"
          fill="none"
          stroke={color}
          strokeWidth="3"
        />
      </svg>
    </SpinnerWrapper>
  ) : (
    <></>
  )

const PageSpinnerWraper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
`

export const PageSpinner: React.FC = () => (
  <PageSpinnerWraper>
    <Spinner size={48} />
  </PageSpinnerWraper>
)
