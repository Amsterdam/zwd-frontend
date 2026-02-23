import {
  Paragraph,
  Accordion,
  UnorderedList
} from "@amsterdam/design-system-react"
import { DateInputField, TextInputField, TextAreaField } from "app/components"
import { validationRequired } from "app/utils/validation"
import type { FieldValues, UseFormReturn } from "react-hook-form"

export const ImportInstructions: React.FC = () => (
  <>
    <Accordion headingLevel={3}>
      <Accordion.Section label="Wat gebeurt er bij het importeren van verzonden vve-brieven?">
        <UnorderedList>
          <UnorderedList.Item>
            Bij een match met een vve wordt een contactmelding aangemaakt. Deze
            is terug te vinden in het communicatieoverzicht van deze vve. Er
            wordt maar één contactmelding aangemaakt per vve, ongeacht hoe vaak
            deze voorkomt in het bronbestand.
          </UnorderedList.Item>
          <UnorderedList.Item>
            Fouten tijdens het importeren worden na de import weergegeven.
          </UnorderedList.Item>
          <UnorderedList.Item>
            Een import kan altijd opnieuw worden uitgevoerd. Reeds aangemaakte
            contactmeldingen worden niet opnieuw aangemaakt, tenzij de gekozen
            verzenddatum van de brief verschilt van de vorige import.
          </UnorderedList.Item>
        </UnorderedList>
      </Accordion.Section>
    </Accordion>

    <Accordion headingLevel={3}>
      <Accordion.Section label="Welke kolommen moet het document bevatten?">
        <Paragraph>Het document moet de volgende kolommen bevatten:</Paragraph>
        <UnorderedList>
          <UnorderedList.Item>
            <strong>vve</strong>: Statutaire naam van de vve
          </UnorderedList.Item>
        </UnorderedList>
      </Accordion.Section>
    </Accordion>
  </>
)

export const ImportFormFields: React.FC<{
  formMethods?: UseFormReturn<FieldValues>
}> = ({ formMethods }) => (
  <>
    <DateInputField
      name="date"
      label="Datum brief"
      type="datetime-local"
      validation={validationRequired}
      formMethods={formMethods}
    />
    <TextInputField
      name="author_name"
      label="Naam auteur"
      validation={validationRequired}
      formMethods={formMethods}
    />
    <TextAreaField
      name="description"
      label="Beschrijving"
      validation={validationRequired}
      formMethods={formMethods}
    />
  </>
)
