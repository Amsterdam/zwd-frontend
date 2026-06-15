import { HouseIcon } from "@amsterdam/design-system-react-icons"
import { useParams } from "react-router-dom"
import { PageHeading, PageSpinner, PageGrid } from "app/components"
import HoaDescription from "./HoaDescription"
import {
  Grid,
  GridColumnNumbers,
  Icon,
  type IconProps,
  Link,
  Paragraph,
  Tabs
} from "@amsterdam/design-system-react"
import {
  useHomeownerAssociation,
  useHomeownerAssociationByBagId,
  useHomeownerAssociationSubsidy
} from "app/state/rest"
import HoaCases from "./HoaCases"
import HoaOwners from "./HoaOwners"
import HoaContacts from "./HoaContacts"
import MapView from "app/components/MapView/MapView"
import Annotation from "./Annotation/Annotation"
import Communication from "./Communication"
import { useURLState } from "app/hooks"
import {
  CertificateIcon,
  EuroCoinsIcon,
  FolderIcon,
  PencilIcon,
  PersonIcon,
  MegaphoneIcon
} from "@amsterdam/design-system-react-icons"
import Subsidy from "./Subsidy/Subsidy"

type TabHeaderProps = {
  label: string
  svg: IconProps["svg"]
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
  const hoa = bagId ? dataByBagId : dataByHoaId
  const [dataSubsidy] = useHomeownerAssociationSubsidy(hoa?.id)
  const [activeTab, setActiveTab] = useURLState("tab", "zaken")

  const hasId = bagId || hoaId
  const loading = isBusy || isLoading
  const hasSubsidies = Array.isArray(dataSubsidy) && dataSubsidy.length > 0

  const tabs = hoa?.id
    ? [
        {
          id: "zaken",
          icon: FolderIcon,
          label: "Zaken",
          panel: <HoaCases hoaId={hoa.id} />
        },
        {
          id: "contactpersonen",
          icon: PersonIcon,
          label: "Contactpersonen",
          panel: <HoaContacts hoaId={hoa.id} />
        },
        {
          id: "eigenaren",
          icon: CertificateIcon,
          label: "Eigenaren",
          panel: <HoaOwners hoa={hoa} />
        },
        {
          id: "communicatie",
          icon: MegaphoneIcon,
          label: "Communicatie",
          panel: <Communication hoaId={hoa.id} />
        },
        {
          id: "aantekeningen",
          icon: PencilIcon,
          label: "Aantekeningen",
          panel: <Annotation hoaId={hoa.id} />
        },
        ...(hasSubsidies
          ? [
              {
                id: "subsidies",
                icon: EuroCoinsIcon,
                label: `Subsidies (${dataSubsidy.length})`,
                panel: <Subsidy data={dataSubsidy} />
              }
            ]
          : [])
      ]
    : []

  return (
    <PageGrid>
      <PageHeading label="VvE-details" icon={HouseIcon} />
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
                    Zie je onjuiste VvE-gegevens?
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
                <p>Er zijn geen VvE-gegevens gevonden voor dit adres.</p>
              </Grid.Cell>
            )}
            {hoa?.zip_code && (
              <Grid.Cell span={gridSpan}>
                <MapView zipCode={hoa?.zip_code ?? undefined} />
              </Grid.Cell>
            )}
          </Grid>
          {hoa?.id && (
            <Tabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              style={{ marginTop: "2rem" }}
            >
              <Tabs.List>
                {tabs.map((tab) => (
                  <Tabs.Button key={tab.id} aria-controls={tab.id}>
                    <TabHeader svg={tab.icon} label={tab.label} />
                  </Tabs.Button>
                ))}
              </Tabs.List>
              {tabs.map((tab) => (
                <Tabs.Panel key={tab.id} id={tab.id}>
                  {tab.panel}
                </Tabs.Panel>
              ))}
            </Tabs>
          )}
        </>
      ) : null}
    </PageGrid>
  )
}

export default AddressPage
