import { Heading, Icon, IconProps } from "@amsterdam/design-system-react"
import styles from "./PageHeading.module.css"
import clsx from "clsx"

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

export const PageHeading: React.FC<Props> = ({
  label,
  level = 2,
  icon,
  border = false
}) => {
  const size: Size = `level-${level}`

  return (
    <div className={clsx(styles.wrapper, border && styles.withBorder)}>
      {icon && (
        <Icon
          size="level-3"
          className={styles.icon}
          svg={icon}
        />
      )}
      <Heading size={size}>{label}</Heading>
    </div>
  )
}

export default PageHeading
