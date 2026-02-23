import React, { useState } from "react"
import { PencilIcon } from "@amsterdam/design-system-react-icons"
import { Heading } from "@amsterdam/design-system-react"
import { useNavigate, useParams } from "react-router-dom"
import {
  DateInputField,
  PageHeading,
  Form,
  RadioGroupFieldSet,
  TextAreaField,
  FormActionButtons,
  HoaName,
  SectionDivider,
  PageSpinner,
  PageGrid
} from "app/components"
import { useCaseCreate, useHomeownerAssociation } from "app/state/rest"
import ContactsFormFields from "./ContactsFormFields"
import ActivationTeamFormFields from "./ActivationTeamFormFields"
import {
  optionsApplicationTypes,
  adviceOptionsForSmallHoa,
  adviceOptionsForLargeHoa,
  ADVIES_TYPES,
  APPLICATION_TYPES,
  ACTIVATIETEAM_TYPES
} from "./formOptions"
import mapData, { dummyValuesActivationTeam } from "./mapData"
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
  const [, { execPost }] = useCaseCreate()
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
          void navigate(`/zaken/${zaakId}`)
        }
      })
      .catch((err) => {
        console.log("Error creating case:", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const adviceOptions = hoa?.is_small
    ? adviceOptionsForSmallHoa
    : adviceOptionsForLargeHoa

  return (
    <PageGrid>
      <PageHeading label="Nieuwe zaak aanmaken" icon={PencilIcon} />
      <>
        <Heading level={3}>Vve</Heading>
        {hoaId && <HoaName id={Number(hoaId)} />}
        <SectionDivider text="Vul dit formulier in om een nieuwe zaak aan te maken" />
        {isBusy ? (
          <PageSpinner />
        ) : (
          <Form
            onSubmit={onSubmit}
            hasDummyButton={env.VITE_ENV === "LOCAL" || env.VITE_ENV === "ONT"}
            dummyValues={dummyValuesActivationTeam}
            formGrid={{ narrow: 4, medium: 6, wide: 6 }}
          >
            <DateInputField
              name="request_date"
              label="Wat is de aanvraagdatum?"
              validation={{ required: true }}
            />
            <RadioGroupFieldSet
              name="application_type"
              label="Waarvoor is de aanvraag?"
              options={optionsApplicationTypes}
              validation={{ required: true }}
            />
            <RadioGroupFieldSet
              name="advice_type"
              label="Wat is het adviestype?"
              options={adviceOptions}
              validation={{ required: true }}
              shouldShow={(formValues) =>
                formValues.application_type === APPLICATION_TYPES.ADVIES
              }
            />
            <ActivationTeamFormFields
              name="ACTIVATION_TEAM_FORM"
              shouldShow={(formValues) =>
                formValues.application_type === APPLICATION_TYPES.ACTIVATIETEAM
              }
            />
            <ContactsFormFields
              name="CONTACTS_FORM"
              shouldShow={(formValues) =>
                (formValues.application_type === APPLICATION_TYPES.ADVIES &&
                  (formValues.advice_type === ADVIES_TYPES.ENERGIEADVIES ||
                    formValues.advice_type ===
                      ADVIES_TYPES.HAALBAARHEIDSONDERZOEK)) ||
                (formValues.application_type ===
                  APPLICATION_TYPES.ACTIVATIETEAM &&
                  (formValues.activationteam_type ===
                    ACTIVATIETEAM_TYPES.INFORMATIEBIJEENKOMST ||
                    formValues.activationteam_type ===
                      ACTIVATIETEAM_TYPES.LEDENVERGADERING))
              }
            />
            <TextAreaField
              name="description"
              label="Toelichting"
              validation={{ required: false, maxLength: 1000 }}
            />
            <FormActionButtons
              okText="Zaak aanmaken"
              onCancel={() => void navigate(-1)}
              loading={loading}
              name="ACTION_BUTTONS"
            />
          </Form>
        )}
      </>
    </PageGrid>
  )
}
