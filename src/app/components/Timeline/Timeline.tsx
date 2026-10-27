import { TimelineItem } from "./TimelineItem/TimelineItem"
import styles from "./Timeline.module.css"
import { Paragraph } from "@amsterdam/design-system-react"

type Props = {
  events: CaseEvent[]
} & React.HTMLAttributes<HTMLDivElement>

export function Timeline({ events, ...restProps }: Props) {
  if (!events || events.length === 0) {
    return (
      <div className={styles.noEvents}>
        <Paragraph>Er zijn geen gebeurtenissen om weer te geven</Paragraph>
      </div>
    )
  }
  return (
    <div className={styles.container} {...restProps}>
      {events.map((event, index) => (
        <TimelineItem key={index} event={event} defaultOpen={index === 0} />
      ))}
    </div>
  )
}
