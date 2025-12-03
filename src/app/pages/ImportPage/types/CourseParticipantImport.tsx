import { Accordion, OrderedList, Paragraph } from "@amsterdam/design-system-react"
import type { FieldValues, UseFormReturn } from "react-hook-form"

export const ImportInstructions: React.FC = () => (
  <>

    <Accordion headingLevel={3}>
      <Accordion.Section label="Wat gebeurt er bij het importeren van cursusdeelnemers?">
        <OrderedList>
          <OrderedList.Item>
            Bij een match met een vve worden bestaande contacten bijgewerkt met de cursusdatum uit het import-bestand, of toegevoegd als nieuw contact wanneer ze nog niet bestaan.
          </OrderedList.Item>
          <OrderedList.Item>
            Fouten tijdens het importeren worden na de import weergegeven.
          </OrderedList.Item>
          <OrderedList.Item>
            Een import kan altijd opnieuw worden uitgevoerd. Reeds geïmporteerde contacten worden niet opnieuw aangemaakt.
          </OrderedList.Item>
        </OrderedList>
      </Accordion.Section>
    </Accordion>

    <Accordion headingLevel={3}>
      <Accordion.Section label="Welke kolommen moet het document bevatten?">
        <Paragraph style={{ marginBottom: "1rem" }}>
          Het document moet de volgende kolommen bevatten:
        </Paragraph>
        <OrderedList>
          <OrderedList.Item><mark>Lorem</mark></OrderedList.Item>
        </OrderedList>
      </Accordion.Section>
    </Accordion>

  </>
)

export const ImportFormFields: React.FC<{ formMethods?: UseFormReturn<FieldValues> }> = () => null

