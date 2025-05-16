import React from "react"
import { DescriptionList } from "@amsterdam/design-system-react"
import { useValues } from "./useValues"
import styles from "./TimelineEvent.module.css"

type Props = {
  event: CaseEvent
}

export const TimelineEvent: React.FC<Props> = ({ event }) => {
  const data = useValues(event)

  return (
    <div className={styles.wrapper}>
      <DescriptionList>
        {data.map((item, index) => (
          <React.Fragment key={`event_values-${index}`}>
            <DescriptionList.Term>{item.label}</DescriptionList.Term>
            <DescriptionList.Description>
              {item.value}
            </DescriptionList.Description>
          </React.Fragment>
        ))}
      </DescriptionList>
    </div>
  )
}
