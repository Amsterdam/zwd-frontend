import React, { useMemo } from "react"
import styled, { keyframes } from "styled-components"

type StyledDivProps = {
  height: number
  width: number
}

const backgroundAnimation = keyframes`
    0% { background-position:40%; }
    50% { background-position:100%; }
    100% { background-position:40%; }
`

const StyledDiv = styled.div<StyledDivProps>`
  height: ${(props) => props.height * 4}px;
  width: ${(props) => props.width}px;
  max-width: 100%;
  background: linear-gradient(270deg, #e6e6e6, #b4b4b4);
  background-size: 400% 400%;
  animation: ${backgroundAnimation} 4s linear infinite;
`

type Props = {
  loading?: boolean
  height?: number
  maxRandomWidth?: number
}

export const SmallSkeleton: React.FC<Props> = ({
  loading = true,
  maxRandomWidth = 100,
  height = 5
}) => {
  const width = useMemo(
    () => Math.round(Math.random() * (maxRandomWidth - 50)) + 50,
    [maxRandomWidth]
  )
  return loading ? (
    <StyledDiv width={width} height={height} data-testid="small-skeleton" />
  ) : (
    <></>
  )
}

export default SmallSkeleton
