import { Accordion, Paragraph, UnorderedList } from "@amsterdam/design-system-react"
import type { FieldValues, UseFormReturn } from "react-hook-form"

export const ImportInstructions: React.FC = () => (
  <>

    <Accordion headingLevel={3}>
      <Accordion.Section label="Wat gebeurt er bij het importeren van cursusdeelnemers?">
        <UnorderedList>
          <UnorderedList.Item>
            Bij een match met een vve worden bestaande contacten bijgewerkt met de cursusdatum uit het import-bestand, of toegevoegd als nieuw contact wanneer ze nog niet bestaan.
          </UnorderedList.Item>
          <UnorderedList.Item>
            Fouten tijdens het importeren worden na de import weergegeven.
          </UnorderedList.Item>
          <UnorderedList.Item>
            Een import kan altijd opnieuw worden uitgevoerd. Reeds geïmporteerde contacten worden niet opnieuw aangemaakt.
          </UnorderedList.Item>
        </UnorderedList>
      </Accordion.Section>
    </Accordion>

    <Accordion headingLevel={3}>
      <Accordion.Section label="Welke kolommen moet het document bevatten?">
        <Paragraph>
          Het document moet de volgende kolommen bevatten:
        </Paragraph>
        <UnorderedList>
          <UnorderedList.Item><strong>naam</strong>: Volledige naam van de cursusdeelnemer</UnorderedList.Item>
          <UnorderedList.Item><strong>email</strong>: E-mailadres van de cursusdeelnemer</UnorderedList.Item>
          <UnorderedList.Item><strong>cursusdatum</strong>: Cursusdatum</UnorderedList.Item>
          <UnorderedList.Item><strong>vve</strong>: Statutaire naam van de vve</UnorderedList.Item>
        </UnorderedList>
        <Paragraph>
          De volgende kolommen zijn optioneel:
        </Paragraph>
        <UnorderedList>
          <UnorderedList.Item><strong>telefoon</strong>: Telefoonnummer van de cursusdeelnemer</UnorderedList.Item>
          <UnorderedList.Item><strong>functie</strong>: Functie binnen de vve van de cursusdeelnemer</UnorderedList.Item>
        </UnorderedList>
      </Accordion.Section>
    </Accordion>

  </>
)

export const ImportFormFields: React.FC<{ formMethods?: UseFormReturn<FieldValues> }> = () => null

