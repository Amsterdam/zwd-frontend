import type { IconProps } from "@amsterdam/design-system-react"

export type MenuItem = {
  label?: string
  path: string
  icon?: IconProps["svg"]
  fixed?: boolean
  core?: boolean
}
