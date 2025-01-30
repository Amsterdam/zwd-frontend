import { Heading, Icon, IconProps } from "@amsterdam/design-system-react"
import styled from "styled-components"

type Props = {
  label: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  icon?: IconProps["svg"]
  border?: boolean
}

type Size =
  | "level-1"
  | "level-2"
  | "level-3"
  | "level-4"
  | "level-5"
  | "level-6"

const Wrapper = styled.div<{ $isBorder: boolean }>`
  display: flex;
  padding-bottom: 8px;
  margin: 24px 0px;
  border-bottom: ${({ $isBorder }) =>
    $isBorder ? "1px solid #b4b4b4" : "none"};
`

const StyledIcon = styled(Icon)<{ level: number }>`
  margin-right: 8px;
  svg {
    height: ${({ level }) => `${40 - level * 4}px`};
    width: ${({ level }) => `${40 - level * 4}px`};
  }
`

export const PageHeading: React.FC<Props> = ({
  label,
  level = 2,
  icon,
  border = false
}) => {
  const size: Size = `level-${level}`
  return (
    <Wrapper $isBorder={border}>
      {icon && <StyledIcon svg={icon} level={level} />}
      <Heading size={size}>{label}</Heading>
    </Wrapper>
  )
}

export default PageHeading
