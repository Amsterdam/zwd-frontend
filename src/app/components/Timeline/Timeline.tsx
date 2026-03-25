import { TimelineItem } from "./TimelineItem/TimelineItem"
import styles from "./Timeline.module.css"

type Props = {
  events: CaseEvent[]
} & React.HTMLAttributes<HTMLDivElement>

export function Timeline({ events, ...restProps }: Props) {
  return (
    <div className={styles.container} {...restProps}>
      {events.map((event, index) => (
        <TimelineItem key={index} event={event} defaultOpen={true} />
      ))}
    </div>
  )
}
