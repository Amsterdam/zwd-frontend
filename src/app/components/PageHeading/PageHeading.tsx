import { Heading, Icon, IconProps } from "@amsterdam/design-system-react"
import styles from "./PageHeading.module.css"
import clsx from "clsx"
import { StandaloneLink } from "@amsterdam/design-system-react"
import { ChevronBackwardIcon } from "@amsterdam/design-system-react-icons"
import { useNavigate } from "react-router-dom"

type Props = {
  label: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  icon?: IconProps["svg"]
  border?: boolean
  backLinkUrl?: string
  backLinkLabel?: string
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
  border = false,
  backLinkUrl,
  backLinkLabel,
}) => {
  const size: Size = `level-${level}`
  const navigate = useNavigate()
  
  return (
    <div className={clsx(styles.wrapper, border && styles.withBorder)}>
      {backLinkUrl && backLinkLabel && (
        <div className={styles.backLink}>
          <StandaloneLink
            href={backLinkUrl}
            onClick={e => {
              e.preventDefault()
              navigate(backLinkUrl)
            }}
            icon={ChevronBackwardIcon}
          >
            {backLinkLabel}
          </StandaloneLink>
        </div>
      )}
      {icon && (
        <Icon
          size="heading-3"
          className={styles.icon}
          svg={icon}
        />
      )}
      <Heading size={size} level={1}>{label}</Heading>
    </div>
  )
}

export default PageHeading
