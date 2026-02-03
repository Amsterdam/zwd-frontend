import { useMemo, useState } from "react"
import { Button, Heading, Paragraph, Row } from "@amsterdam/design-system-react"
import { useHomeownerAssociation } from "app/state/rest"
import { TextAreaField, FormActionButtons, Form } from "app/components"
import { PencilIcon, PlusIcon } from "@amsterdam/design-system-react-icons"
import { formatTextWithLineBreaks } from "app/utils/text.tsx"

type FormValues = {
  annotation: Components.Schemas.HomeownerAssociation["annotation"]
}

export const Annotation: React.FC<{ hoaId: number }> = ({ hoaId }) => {
  const [data, { execPatch }] = useHomeownerAssociation(hoaId)
  const [isEditing, setIsEditing] = useState(false)

  const hasAnnotation = useMemo(
    () =>
      data?.annotation?.length &&
      data?.annotation?.length > 0 &&
      data?.annotation,
    [data?.annotation]
  )

  const onSubmit = (values: FormValues) => {
    if (values.annotation?.trim().length === 0) {
      const confirm = window.confirm(
        "Weet je zeker dat je de aantekening wilt verwijderen?"
      )
      if (confirm) {
        values.annotation = null
      } else {
        setIsEditing(false)
        return
      }
    }
    void execPatch(values).then(() => {
      setIsEditing(false)
    })
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
          display: isEditing ? "none" : "flex"
        }}
      >
        <Button
          variant="primary"
          icon={hasAnnotation ? PencilIcon : PlusIcon}
          iconBefore
          onClick={toggleEdit}
        >
          {hasAnnotation ? "Aantekeningen bewerken" : "Aantekening toevoegen"}
        </Button>
      </Row>
      {isEditing ? (
        <Form<FormValues>
          defaultValues={{ annotation: data?.annotation }}
          onSubmit={onSubmit}
          formGrid={{ narrow: 4, medium: 8, wide: 12 }}
        >
          <TextAreaField
            name="annotation"
            label={
              hasAnnotation ? "Aantekening bewerken" : "Aantekening toevoegen"
            }
            validation={{ required: false }}
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
          <Paragraph style={{ margin: "1rem 0" }}>
            {hasAnnotation ? (
              formatTextWithLineBreaks(data?.annotation)
            ) : (
              <em>Geen aantekeningen gevonden</em>
            )}
          </Paragraph>
        </>
      )}
    </>
  )
}

export default Annotation
