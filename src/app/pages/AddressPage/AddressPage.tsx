import { Button } from "@amsterdam/design-system-react"
import { HousingIcon } from "@amsterdam/design-system-react-icons"
import { styled } from "styled-components"
import { useNavigate, useParams } from "react-router-dom"
import { PanoramaPreview, PageHeading, PageSpinner, Descriptions } from "app/components"
import { useHomeownerAssociation } from "app/state/rest"


const Wrapper = styled.div`
  margin: 24px 0;
`

export const AddressPage: React.FC = () => {
  const { bagId } = useParams<{ bagId: string }>()
  const [data, { isBusy }] = useHomeownerAssociation(bagId)
  const navigate = useNavigate()

  const items = [
    { label: "VVE statutaire naam", children: data?.name },
    { label: "Bouwjaar", children: data?.build_year },
    { label: "Aantal appartementen", children: data?.number_of_appartments }
  ]
  
  return (
    <>
      <PageHeading label="Adresoverzicht" icon={ HousingIcon } />
      { bagId && <PanoramaPreview bagId={ bagId } aspect={ 4 } fov={ 120 } />}
      { isBusy && <PageSpinner /> }
      { data && data.id && (
        <>
          <Wrapper>
            <Descriptions items={ items } />
          </Wrapper>
          <Button onClick={ () => navigate(`/vve/${ data.id }/zaken/nieuw`)} >
            Nieuwe zaak aanmaken  
          </Button>
        </>
      )}
    </>
  )
}

export default AddressPage
    