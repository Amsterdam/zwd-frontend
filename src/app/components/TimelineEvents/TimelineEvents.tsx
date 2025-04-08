import { Accordion } from "@amsterdam/design-system-react"
import { getEventTitle } from "./dictionaries"
import { TimelineEvent } from "./TimelineEvent"
import styles from "app/components/ads-override.module.css"

export const TimelineEvents: React.FC<{ events: CaseEvent[] }> = ({
  events
}) => (
  <Accordion
    headingLevel={1}
    sectionAs="div"
    className={styles.accordionOverride}
  >
    {events.map((event, index) => (
      <Accordion.Section
        key={event.id}
        label={getEventTitle(event)}
        expanded={index === 0}
      >
        <TimelineEvent event={event} />
      </Accordion.Section>
    ))}
  </Accordion>
)
