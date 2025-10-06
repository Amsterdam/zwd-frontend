import { HouseIcon } from "@amsterdam/design-system-react-icons"
import { useParams } from "react-router-dom"
import { PageHeading, PageSpinner, PageGrid } from "app/components"
import HoaDescription from "./HoaDescription"
import {
  Grid,
  GridColumnNumbers,
  Icon,
  Link,
  Paragraph,
  Tabs
} from "@amsterdam/design-system-react"
import {
  useHomeownerAssociation,
  useHomeownerAssociationByBagId
} from "app/state/rest"
import HoaCases from "./HoaCases"
import HoaOwners from "./HoaOwners"
import Section from "./Section"
import HoaContacts from "./HoaContacts"
import MapView from "app/components/MapView/MapView"
import { useURLState } from "app/hooks"
import {
  CertificateIcon,
  FolderIcon,
  PersonIcon,
} from "@amsterdam/design-system-react-icons"

type TabHeaderProps = {
  label: string
  svg: React.FC
}

const TabHeader: React.FC<TabHeaderProps> = ({ svg, label }) => (
  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
    <Icon svg={svg} />
    {label}
  </div>
)

const gridSpan: GridColumnNumbers = { narrow: 4, medium: 8, wide: 6 }

export const AddressPage: React.FC = () => {
  const { bagId, hoaId } = useParams<{ bagId: string; hoaId: string }>()
  const hoaIdNumber = hoaId ? Number(hoaId) : undefined
  const [dataByBagId, { isBusy }] = useHomeownerAssociationByBagId(bagId)
  const [dataByHoaId, { isBusy: isLoading }] =
    useHomeownerAssociation(hoaIdNumber)
  const [activeTab, setActiveTab] = useURLState("tab", "zaken")

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
                  <span style={{ marginRight: "0.25rem" }}>
                    Zie je onjuiste vve-gegevens?
                  </span>
                  <Link
                    href="https://www.amsterdam.nl/stelselpedia/terugmelden/"
                    target="_blank"
                    rel="external noopener noreferrer"
                  >
                    Meld het hier
                  </Link>
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
            <Section>
              <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
                <Tabs.List>
                  <Tabs.Button aria-controls="zaken">
                    <TabHeader svg={FolderIcon} label="Zaken" />
                  </Tabs.Button>
                  <Tabs.Button aria-controls="contactpersonen">
                    <TabHeader svg={PersonIcon} label="Contactpersonen" />
                  </Tabs.Button>
                  <Tabs.Button aria-controls="eigenaren">
                    <TabHeader svg={CertificateIcon} label="Eigenaren" />
                  </Tabs.Button>
                </Tabs.List>
                <Tabs.Panel id="zaken">
                  <HoaCases hoaId={hoa.id} />
                </Tabs.Panel>
                <Tabs.Panel id="contactpersonen">
                  <HoaContacts hoaId={hoa.id} />
                </Tabs.Panel>
                <Tabs.Panel id="eigenaren">
                  <HoaOwners hoa={hoa} />
                </Tabs.Panel>
              </Tabs>
            </Section>
          )}
        </>
      ) : null}
    </PageGrid>
  )
}

export default AddressPage
