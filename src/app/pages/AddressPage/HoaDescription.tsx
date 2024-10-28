import { Button } from "@amsterdam/design-system-react"
import { styled } from "styled-components"
import { useNavigate } from "react-router-dom"
import { PageSpinner, Descriptions } from "app/components"
import { useHomeownerAssociationByBagId } from "app/state/rest"
import HoaCases from "./HoaCases"


type Props = {
  bagId: string
}

const Wrapper = styled.div`
  margin: 24px 0;
`

export const HoaDescription: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = useHomeownerAssociationByBagId(bagId)
  const navigate = useNavigate()

  if (isBusy) {
    return <PageSpinner />
  }
  if (data?.message) {
    return <p>Er zijn geen VVE-gegevens gevonden voor dit adres.</p>
  }
  if (data?.id) {
    const items = [
      { label: "VVE statutaire naam", children: data?.name },
      { label: "Bouwjaar", children: data?.build_year },
      { label: "Aantal appartementen", children: data?.number_of_appartments }
    ]
    return (
      <>
        <Wrapper>
          <Descriptions items={ items } />
        </Wrapper>
        <Wrapper>
          { data?.id && <HoaCases hoaId={ data.id } /> }
        </Wrapper>
        <Button onClick={ () => navigate(`/vve/${ data.id }/zaken/nieuw`)} >
          Nieuwe zaak aanmaken  
        </Button>
      </>
    )
  }
  return null
}

export default HoaDescription
    