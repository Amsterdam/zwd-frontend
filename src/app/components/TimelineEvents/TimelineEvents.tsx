import { Accordion } from "@amsterdam/design-system-react"
import { getEventTitle } from "./dictionaries"
import { TimelineEvent } from "./TimelineEvent"


export const TimelineEvents: React.FC<{ events: CaseEvent[] }> = ({ events }) => (
  <>
    <Accordion
      headingLevel={1}
      sectionAs="div"
    >
      { events.map((event, index) => (
        <Accordion.Section 
          key={ event.id } 
          label={ getEventTitle(event) } 
          expanded={ index === 0 } 
        >
          <TimelineEvent event={ event }/>
        </Accordion.Section>
      ))}
    </Accordion>
  </>
)
