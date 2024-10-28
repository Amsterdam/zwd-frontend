import React, { useState } from "react"
import { EditDocumentIcon } from "@amsterdam/design-system-react-icons"
import { PageHeading, Form, RadioGroupFieldSet, TextAreaField, FormActionButtons, HoaName, SectionDivider } from "app/components"
import { useCases } from "app/state/rest"
import { useNavigate, useParams } from "react-router-dom"
import { Heading } from "@amsterdam/design-system-react"


type ExecPostResponse = {
  data: {
    id: number
  }
}

const options = [
  { value: "Energieadvies", label: "Energieadvies" },
  { value: "Haalbaarheidsonderzoek", label: "Haalbaarheidsonderzoek" },
  { value: "Cursus", label: "Cursus" }
]

export const CaseCreatePage: React.FC = () => {
  const { hoaId } = useParams<{ hoaId: string }>()  
  const [loading, setLoading] = useState<boolean>(false)
  const [ ,{ execPost } ] = useCases({ lazy: true })
  const navigate = useNavigate()
  
  const onSubmit = (data: Components.Schemas.CaseCreate) => {
    if (!hoaId) return
    const homeowner_association = Number(hoaId)
    setLoading(true)
    
    const values = {
      ...data,
      homeowner_association
    }

    execPost(values)
      .then((resp) => {
        const zaakId = (resp as ExecPostResponse)?.data?.id
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
      <Heading level={4} >VVE</Heading>
      { hoaId && <HoaName id={ Number(hoaId) } /> }
      <SectionDivider text="Gebruik dit formulier om een nieuwe zaak toe te voegen" />
      <Form onSubmit={ onSubmit } >
        <RadioGroupFieldSet name="advice_type" label="Wat is het advies type?" options={ options } validation={{ required: true }}/>
        <TextAreaField name="description" label="Toelichting" validation={{ required: true, maxLength: 1000 }} />
        <FormActionButtons okText="Zaak aanmaken" onCancel={ () => navigate(-1) } loading={ loading } />
      </Form>
    </>
  )
}
