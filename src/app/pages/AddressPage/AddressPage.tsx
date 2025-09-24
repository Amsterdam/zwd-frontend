import { HouseIcon } from "@amsterdam/design-system-react-icons"
import { useNavigate, useParams } from "react-router-dom"
import { PageHeading, PageSpinner, PageGrid } from "app/components"
import HoaDescription from "./HoaDescription"
import { Button, Grid, GridColumnNumbers, Link, Paragraph } from "@amsterdam/design-system-react"
import {
  useHomeownerAssociation,
  useHomeownerAssociationByBagId
} from "app/state/rest"
import HoaCases from "./HoaCases"
import HoaOwners from "./HoaOwners"
import Section from "./Section"
import HoaContacts from "./HoaContacts"
import MapView from "app/components/MapView/MapView"

const gridSpan: GridColumnNumbers = { narrow: 4, medium: 8, wide: 6 }

export const AddressPage: React.FC = () => {
  const { bagId, hoaId } = useParams<{ bagId: string; hoaId: string }>()
  const hoaIdNumber = hoaId ? Number(hoaId) : undefined
  const [dataByBagId, { isBusy }] = useHomeownerAssociationByBagId(bagId)
  const [dataByHoaId, { isBusy: isLoading }] =
    useHomeownerAssociation(hoaIdNumber)
  const navigate = useNavigate()

  const hasId = bagId || hoaId
  const loading = isBusy || isLoading
  const hoa = bagId ? dataByBagId : dataByHoaId

  return (
    <PageGrid>
      <PageHeading label="Overzicht vve" icon={HouseIcon} />
      {loading ? (
        <PageSpinner />
      ) : hasId ? (
        <>
          <Grid style={{ paddingLeft: 0 }} paddingBottom="large">
            {hoa?.id ? (
              <Grid.Cell span={gridSpan}>
                <HoaDescription hoa={hoa} />
                <Paragraph size="small" style={{ marginTop: "1.5rem" }}>
                  <span style={{ marginRight: "0.25rem" }}>Zie je onjuiste vve-gegevens?</span>
                  <Link href="https://www.amsterdam.nl/stelselpedia/terugmelden/" target="_blank" rel="external noopener noreferrer">Meld het hier</Link>
                </Paragraph>
              </Grid.Cell>
            ) : (
              <Grid.Cell span={gridSpan}>
                <p>Er zijn geen vve-gegevens gevonden voor dit adres.</p>
              </Grid.Cell>
            )}
            {hoa?.zip_code && (
              <Grid.Cell span={gridSpan}>
                <MapView zipCode={hoa?.zip_code ?? undefined} />
              </Grid.Cell>
            )}
          </Grid>
          {hoa?.id && (
            <>
              <Section>
                <HoaContacts hoaId={hoa.id} />
              </Section>
              <Section>
                <HoaOwners hoa={hoa} />
              </Section>
              <Section>
                <HoaCases hoaId={hoa.id} />
              </Section>
              <Section>
                <Button
                  onClick={() => void navigate(`/vve/${hoa.id}/zaken/nieuw`)}
                >
                  Nieuwe zaak aanmaken
                </Button>
              </Section>
            </>
          )}
        </>
      ) : null}
    </PageGrid>
  )
}

export default AddressPage
