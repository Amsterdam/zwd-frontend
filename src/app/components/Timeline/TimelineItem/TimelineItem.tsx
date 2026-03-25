import { useState } from "react"
import { Icon } from "@amsterdam/design-system-react"
import {
  CheckMarkIcon,
  ChevronDownIcon,
  DocumentCheckMarkIcon,
  SpeechBalloonEllipsisIcon
} from "@amsterdam/design-system-react-icons"
import { useValues } from "./useValues"
import { getEventTitle } from "./dictionaries"
import { Descriptions } from "app/components"
import styles from "./TimelineItem.module.css"

type Props = {
  event: CaseEvent
  defaultOpen?: boolean
}

export function TimelineItem({ event, defaultOpen }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const data = useValues(event)

  const isNote = event.event_variables?.form_notitie_toevoegen
  const hasDocument = event.event_variables?.document_name

  const iconSvg = isNote
    ? SpeechBalloonEllipsisIcon
    : hasDocument
      ? DocumentCheckMarkIcon
      : CheckMarkIcon

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className={styles.itemWrapper}>
      <div className={`${styles.marker} ${isNote ? styles.markerNote : ""}`}>
        <Icon svg={iconSvg} className={isNote ? styles.iconWhite : ""} />
      </div>

      <div
        className={`${styles.itemContent} ${isOpen ? styles.itemContentOpen : ""}`}
      >
        <button
          type="button"
          className={styles.button}
          onClick={toggleOpen}
          aria-expanded={isOpen}
        >
          <strong>{getEventTitle(event)}</strong>
          <ChevronDownIcon
            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
            height={16}
            width={16}
          />
        </button>

        <div
          className={`${styles.collapsibleContent} ${isOpen ? styles.collapsibleOpen : ""}`}
        >
          <div className={styles.collapsibleInner}>
            <div className={styles.divider} />
            <Descriptions items={data} variant="subtle" />
          </div>
        </div>
      </div>
    </div>
  )
}
