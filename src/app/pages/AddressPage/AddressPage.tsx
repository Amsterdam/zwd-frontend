import { HousingIcon } from "@amsterdam/design-system-react-icons"
import { useNavigate, useParams } from "react-router-dom"
import { PanoramaPreview, PageHeading, PageSpinner } from "app/components"
import HoaDescription from "./HoaDescription"
import { Button, Grid, GridColumnNumbers } from "@amsterdam/design-system-react"
import { useHomeownerAssociationByBagId } from "app/state/rest"
import { styled } from "styled-components"
import HoaCases from "./HoaCases"
import HoaOwners from "./HoaOwners"

const gridSpan: GridColumnNumbers = { narrow: 4, medium: 8, wide: 6 }

const Wrapper = styled.div`
  margin-bottom: 40px;
`

export const AddressPage: React.FC = () => {
  const { bagId } = useParams<{ bagId: string }>()  
  const [hoa, { isBusy }] = useHomeownerAssociationByBagId(bagId)
  const navigate = useNavigate()

  return (
    <>
      <PageHeading label="Adresoverzicht" icon={ HousingIcon } />
      { isBusy && <PageSpinner /> }
      { !isBusy && bagId && (
        <>
          <Grid style={{ paddingLeft: 0 }} paddingTop="small" paddingBottom="large">
            {hoa?.id ? ( 
              <Grid.Cell span={ gridSpan } >
                <HoaDescription hoa={ hoa } /> 
              </Grid.Cell>
            ) : (
              <Grid.Cell span={ gridSpan } >
                <p>Er zijn geen vve-gegevens gevonden voor dit adres.</p>
              </Grid.Cell>
            )}
            <Grid.Cell span={ gridSpan } >
              <PanoramaPreview bagId={ bagId } aspect={ 4 } fov={ 120 } />
            </Grid.Cell>
          </Grid>
          { hoa?.id && (
            <>
              <Wrapper>
                <HoaOwners hoa={hoa} />
              </Wrapper>
              <Wrapper>
                <HoaCases hoaId={hoa.id} />
              </Wrapper>
              <Wrapper>
                <Button onClick={() => navigate(`/vve/${ hoa.id }/zaken/nieuw`)}>
                  Nieuwe zaak aanmaken
                </Button>
              </Wrapper>
            </>
          )}
        </>
      )}
    </>
  )
}

export default AddressPage
    