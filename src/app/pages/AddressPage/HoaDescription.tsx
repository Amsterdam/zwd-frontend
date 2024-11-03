import { Button } from "@amsterdam/design-system-react"
import { styled } from "styled-components"
import { useNavigate } from "react-router-dom"
import { PageSpinner, Descriptions } from "app/components"
import { useHomeownerAssociationByBagId } from "app/state/rest"
import HoaCases from "./HoaCases"
import HoaOwners from "./HoaOwners"


type Props = {
  bagId: string
}

const Wrapper = styled.div`
  margin: 24px 0;
`

export const HoaDescription: React.FC<Props> = ({ bagId }) => {
  const [hoa, { isBusy }] = useHomeownerAssociationByBagId(bagId)
  const navigate = useNavigate()

  if (isBusy) {
    return <PageSpinner />
  }
  if (hoa?.message) {
    return <p>Er zijn geen VVE-gegevens gevonden voor dit adres.</p>
  }
  if (hoa?.id) {
    const items = [
      { label: "VVE statutaire naam", children: hoa?.name },
      { label: "Bouwjaar", children: hoa?.build_year },
      { label: "Aantal woningen", children: hoa?.number_of_appartments },
      { label: "Stadsdeel", children: hoa?.district },
      { label: "Buurt", children: hoa?.neighborhood }
    ]
    return (
      <>
        <Wrapper>
          <Descriptions items={ items } />
        </Wrapper>
        <Wrapper>
          <HoaOwners hoa={ hoa } />
        </Wrapper>
        <Wrapper>
          <HoaCases hoaId={ hoa.id } />
        </Wrapper>
        <Button onClick={ () => navigate(`/vve/${ hoa.id }/zaken/nieuw`)} >
          Nieuwe zaak aanmaken  
        </Button>
      </>
    )
  }
  return null
}

export default HoaDescription
    