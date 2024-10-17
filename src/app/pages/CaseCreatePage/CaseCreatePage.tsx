import React, { useState } from "react"
import { EditDocumentIcon } from "@amsterdam/design-system-react-icons"
import { Button } from "@amsterdam/design-system-react"
import { PageHeading, Spinner } from "app/components"
import { Form, RadioGroupFieldSet, TextAreaField } from "app/components/forms"
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
    const values: Components.Schemas.CaseCreate = {
      ...data,
      homeowner_association
    }
    execPost(values)
      .then((resp) => {
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
        <RadioGroupFieldSet name="advice_type" label="Wat is het advies type?" options={ options } />
        <TextAreaField name="description" label="Beschrijving" />
        {/* <Button type="submit" disabled={ !isValid || loading }> */}
        <Button type="submit" >
          Zaak aanmaken  
          <Spinner loading={ loading } size={ 24 } color="#FFFFFF"/>
        </Button>
      </Form>
    </>
  )
}
