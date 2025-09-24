import { useState } from "react"
import { useParams } from "react-router-dom"
import {
  Heading,
  IconButton,
  Paragraph,
  Row
} from "@amsterdam/design-system-react"
import { useCase } from "app/state/rest"
import { TextAreaField, FormActionButtons, Form } from "app/components"
import { validationRequired } from "app/utils/validation"
import { PencilIcon } from "@amsterdam/design-system-react-icons"

type FormValues = {
  communication_note: Components.Schemas.Case["communication_note"]
}

export const Annotation: React.FC = () => {
  const { caseId } = useParams()
  const [data, { execPatch }] = useCase(Number(caseId))
  const [isEditing, setIsEditing] = useState(false)

  const onSubmit = (values: FormValues) => {
    execPatch(values)
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  return (
    <>
      <Row alignVertical="center">
        <Heading level={4}>Aantekeningen</Heading>
        <IconButton
          svg={PencilIcon}
          label="Wijzig aantekening"
          title="Wijzig aantekening"
          onClick={toggleEdit}
          size="large"
          style={{
            visibility: isEditing ? "hidden" : "visible",
            pointerEvents: isEditing ? "none" : "auto"
          }}
        />
      </Row>
      {isEditing ? (
        <div style={{ marginLeft: 4 }}>
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
        </div>
      ) : (
        <Paragraph style={{ margin: "16px 0", whiteSpace: "pre-line" }}>
          {data?.communication_note}
        </Paragraph>
      )}
    </>
  )
}

export default Annotation
