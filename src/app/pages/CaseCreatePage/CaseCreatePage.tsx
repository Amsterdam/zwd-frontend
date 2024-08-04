import { Button, ErrorMessage, Field, Grid, Label, Paragraph, TextArea } from "@amsterdam/design-system-react"
import { EditDocumentIcon } from "@amsterdam/design-system-react-icons"
import { useForm } from "react-hook-form"
import { PageHeading, Spinner } from "app/components"
import { useCases } from "app/state/rest"
import styled from "styled-components"
import withExceptionCapturing from "app/utils/withExceptionCapturing"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

type FormData  = {
  description?: Components.Schemas.CaseCreate["description"]
}

const StyledGrid = styled(Grid)`
  padding-left: 0; // Overwrite the default padding of the Grid.
`

export const CaseCreatePage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormData>()
  const [ ,{ execPost } ] = useCases({ lazy: true })
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    setLoading(true)
    const values: Components.Schemas.CaseCreate = {
      description: data?.description as string
    }
    execPost(values as Components.Schemas.Case)
      .then((resp) => {
        // @ts-expect-error: Unreachable code error
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
  })


  return (
    <>
      <PageHeading label="Nieuwe zaak aanmaken" icon={ EditDocumentIcon } />
      <StyledGrid paddingTop="small" paddingBottom="medium">
        <Grid.Cell span={{ narrow: 4, medium: 6, wide: 8 }} start={ 1 }>
          <form className="ams-gap--md" id="main" onSubmit={withExceptionCapturing(onSubmit)}>
            <Field>
              <Label htmlFor="body">Toelichting</Label>
              <Paragraph id="bodyDescription" size="small">
                Geef een toelichting voor deze VVE (niet verplicht). 
              </Paragraph>
              <TextArea
                aria-describedby="bodyDescription"
                id="body"
                rows={4}
                invalid={ !!errors.description }
                {...register("description", { required: true, maxLength: 1000 })}
              />
              { errors.description && (
                <ErrorMessage>
                  Dit is een verplicht veld!
                </ErrorMessage>
              )}
            </Field>
            <div>
              <Button type="submit" disabled={ !isValid || loading }>
                Zaak aanmaken  
                <Spinner loading={ loading } size={ 32 } color="#FFFFFF"/>
              </Button>
            </div>
          </form>
        </Grid.Cell>
      </StyledGrid>
    </>
  )
}
