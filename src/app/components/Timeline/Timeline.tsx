import { TimelineItem } from "./TimelineItem/TimelineItem"
import styles from "./Timeline.module.css"

type Props = {
  events: CaseEvent[]
}

export function Timeline({ events }: Props) {
  return (
    <div className={styles.container}>
      {events.map((event, index) => (
        <TimelineItem key={index} event={event} open={true} />
      ))}
    </div>
  )
}
