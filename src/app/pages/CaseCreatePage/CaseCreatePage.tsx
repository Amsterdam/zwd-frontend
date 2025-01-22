import React, { useState } from "react"
import { EditDocumentIcon } from "@amsterdam/design-system-react-icons"
import { Heading } from "@amsterdam/design-system-react"
import { useNavigate, useParams } from "react-router-dom"
import {
  PageHeading,
  Form,
  RadioGroupFieldSet,
  TextAreaField,
  FormActionButtons,
  HoaName,
  SectionDivider,
  PageSpinner
} from "app/components"
import { useCases, useHomeownerAssociation } from "app/state/rest"
import { ContactsFormFields } from "./ContactsFormFields"
import { optionsForSmallHoa, optionsForBigHoa } from "./formOptions"
import mapData, { defaultDummyValues } from "./mapData"
import type { CaseCreateFormTypes } from "./mapData"
import { env } from "app/config/env"

type ExecPostResponse = {
  data: {
    id: number
  }
}

export const CaseCreatePage: React.FC = () => {
  const { hoaId } = useParams<{ hoaId: string }>()
  const [loading, setLoading] = useState<boolean>(false)
  const [, { execPost }] = useCases({ lazy: true })
  const [hoa, { isBusy }] = useHomeownerAssociation(Number(hoaId))
  const navigate = useNavigate()

  const onSubmit = (data: CaseCreateFormTypes) => {
    if (!hoaId) return
    const homeowner_association = Number(hoaId)
    setLoading(true)
    const values = mapData(data, homeowner_association)

    execPost(values)
      .then((resp) => {
        const zaakId = (resp as ExecPostResponse)?.data?.id
        if (zaakId) {
          navigate(`/zaken/${ zaakId }`)
        }
      })
      .catch((err) => {
        console.log("Error creating case:", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const options = hoa?.is_small ? optionsForSmallHoa : optionsForBigHoa

  return (
    <>
      <PageHeading label="Nieuwe zaak aanmaken" icon={EditDocumentIcon} />
      <Heading level={3}>Vve</Heading>
      {hoaId && <HoaName id={Number(hoaId)} />}
      <SectionDivider text="Vul dit formulier in om een nieuwe zaak aan te maken" />
      {isBusy ? (
        <PageSpinner />
      ) : (
        <Form
          onSubmit={onSubmit}
          hasDummyButton={env.VITE_ENV === "LOCAL"}
          dummyValues={defaultDummyValues}
        >
          <RadioGroupFieldSet
            name="advice_type"
            label="Wat is het advies type?"
            options={options}
            validation={{ required: true }}
          />
          <ContactsFormFields />
          <TextAreaField
            name="description"
            label="Toelichting"
            validation={{ required: true, maxLength: 1000 }}
          />
          <FormActionButtons
            okText="Zaak aanmaken"
            onCancel={() => navigate(-1)}
            loading={loading}
          />
        </Form>
      )}
    </>
  )
}
