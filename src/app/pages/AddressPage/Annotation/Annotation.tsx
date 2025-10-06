import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import {
  Button,
  Heading,
  Paragraph,
  Row
} from "@amsterdam/design-system-react"
import { useCase } from "app/state/rest"
import { TextAreaField, FormActionButtons, Form } from "app/components"
import { validationRequired } from "app/utils/validation"
import { PencilIcon, PlusIcon } from "@amsterdam/design-system-react-icons"

type FormValues = {
  communication_note: Components.Schemas.Case["communication_note"]
}

export const Annotation: React.FC = () => {
  const { caseId } = useParams()
  const [data, { execPatch }] = useCase(Number(caseId))
  const [isEditing, setIsEditing] = useState(false)

  const hasCommunicationNote = useMemo(() =>
    data?.communication_note?.length && data?.communication_note?.length > 0 && data?.communication_note
  , [data?.communication_note])

  const onSubmit = (values: FormValues) => {
    execPatch(values)
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  return (
    <>
      <Row
        align="end"
        style={{
          marginBottom: "1rem",
          display: isEditing ? "none" : "flex",
        }}>
        <Button
          variant="primary"
          icon={hasCommunicationNote ? PencilIcon : PlusIcon}
          iconBefore
          onClick={toggleEdit}
        >
          {hasCommunicationNote ? "Aantekeningen bewerken" : "Aantekening toevoegen"}
        </Button>
      </Row>
      {isEditing ? (
        <Form<FormValues>
          defaultValues={{ communication_note: data?.communication_note }}
          onSubmit={onSubmit}
          formGrid={{ narrow: 4, medium: 8, wide: 12 }}
        >
          <TextAreaField
            name="communication_note"
            label=""
            validation={validationRequired}
            rows={10}
          />
          <FormActionButtons
            name="actions"
            okText="Opslaan"
            cancelText="Annuleer"
            onCancel={toggleEdit}
          />
        </Form>
      ) : (
        <>
          <Heading level={4}>Aantekeningen</Heading>
          <Paragraph style={{ margin: "1rem 0", whiteSpace: "pre-line" }}>
            {hasAnnotation
              ? data?.annotation
                : <em>Geen aantekeningen gevonden</em>
              }
            </Paragraph>
        </>
      )}
    </>
  )
}

export default Annotation
