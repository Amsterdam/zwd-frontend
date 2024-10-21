import React, { useState } from "react"
import { EditDocumentIcon } from "@amsterdam/design-system-react-icons"
import { PageHeading, Form, RadioGroupFieldSet, TextAreaField, FormActionButtons } from "app/components"
import { useCases } from "app/state/rest"
import { useNavigate, useParams } from "react-router-dom"


const options = [
  { value: "Energieadvies", label: "Energieadvies" },
  { value: "Haalbaarheidsonderzoek", label: "Haalbaarheidsonderzoek" },
  { value: "Cursus", label: "Cursus" }
]

export const CaseCreatePage: React.FC = () => {
  const { vveId } = useParams<{ vveId: string }>()  
  const [loading, setLoading] = useState<boolean>(false)
  const [ ,{ execPost } ] = useCases({ lazy: true })
  const navigate = useNavigate()
  
  const onSubmit = (data: Components.Schemas.CaseCreate) => {
    if (!vveId) return
    const homeowner_association = Number(vveId)
    setLoading(true)
    
    const values = {
      ...data,
      homeowner_association
    }

    execPost(values)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((resp: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const zaakId = resp?.data?.id
        if (zaakId) {
          navigate(`/zaken/${ zaakId }`)
        }        
      }).catch((err) => {
        console.log("Error creating case:", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <PageHeading label="Nieuwe zaak aanmaken" icon={ EditDocumentIcon } />
      <Form onSubmit={ onSubmit } >
        <RadioGroupFieldSet name="advice_type" label="Wat is het advies type?" options={ options } validation={{ required: true }}/>
        <TextAreaField name="description" label="Toelichting" validation={{ maxLength: 1000 }} />
        <FormActionButtons okText="Zaak aanmaken" onCancel={ () => navigate(-1) } loading={ loading } />
      </Form>
    </>
  )
}
