import { Button, Field, Grid, Label, Paragraph, TextArea } from "@amsterdam/design-system-react"
import { EditDocumentIcon } from "@amsterdam/design-system-react-icons"
import { SubmitHandler, useForm } from "react-hook-form"
import { PageHeading } from "app/components"
import { useCases } from "app/state/rest"
import styled from "styled-components"


type IFormInput = {
  description?: Components.Schemas.CaseCreate["description"]
}

const StyledGrid = styled(Grid)`
  padding-left: 0; // Overwrite the default padding of the Grid.
`

export const CaseCreatePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [ ,{ execPost } ] = useCases()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("DATA", data)
    const values: Components.Schemas.CaseCreate = {
      description: data?.description as string
    }
    execPost(values as Components.Schemas.Case)
      .then((resp) => {
        console.log("SUCCES", resp)
      }).catch((err) => {
        console.log("Error", err)
      })
  }

  console.log("errors", errors)
  console.log("!errors.description", !errors.description)
  console.log("!!errors.description", !!errors.description)
  return (
    <>
      <PageHeading label="Nieuwe zaak aanmaken" icon={ EditDocumentIcon } />
      <StyledGrid paddingTop="small" paddingBottom="medium">
        <Grid.Cell span={{ narrow: 4, medium: 6, wide: 8 }} start={ 1 }>
          <form className="ams-gap--md" id="main" onSubmit={ void handleSubmit(onSubmit)}>
            <Field>
              <Label htmlFor="body">Toelichting</Label>
              <Paragraph id="bodyDescription" size="small">
                Geef een toelichting voor deze VVE (niet verplicht). 
              </Paragraph>
              <TextArea
                aria-describedby="bodyDescription"
                id="body"
                rows={4}
                // invalid={ !!errors.description }
                {...register("description", { required: true, maxLength: 1000 })}
              />
            </Field>
            <div>
              <Button type="submit">Zaak aanmaken</Button>
            </div>
          </form>
        </Grid.Cell>
      </StyledGrid>
    </>
  )
}
