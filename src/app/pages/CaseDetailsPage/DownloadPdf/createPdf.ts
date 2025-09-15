import { jsPDF } from "jspdf"
import amsterdam from "./assets/amsterdam.png"
import { FONT_REGULAR, FONT_BOLD } from "./fonts"
import { formatDate } from "app/utils/dates"

const FONT_SIZE_TITLE = 24
const FONT_SIZE_NORMAL = 10
const MARGIN_LEFT = 30 // Margin left for the text
const MARGIN_LEFT_VALUE = 85 // Margin left for the value after the first text
const MARGIN_RIGHT = MARGIN_LEFT // Margin right for the maxWidth / pageWidth
const LINE_HEIGHT_LABEL = 6 // Line height for labels (more vertical space)
const LINE_HEIGHT_VALUE = 4 // Line height for the value

type Data = {
  label: string
  value?: string | number
}[]

const addDescription = (
  doc: jsPDF,
  title: string,
  data: Data,
  startY: number
): number => {
  // Section tiltle
  doc.setFont("Amsterdam-Bold", "bold")
  doc.setFontSize(FONT_SIZE_NORMAL)
  doc.text(title, MARGIN_LEFT, startY)

  // Set font for content
  doc.setFont("Amsterdam-Regular", "normal")
  doc.setFontSize(FONT_SIZE_NORMAL)

  // Calculate maximum available widths for labels and values
  const maxWidthLabel = doc.internal.pageSize.width - MARGIN_RIGHT - MARGIN_LEFT
  const maxWidthValue =
    doc.internal.pageSize.width - MARGIN_RIGHT - MARGIN_LEFT_VALUE

  let yPos = startY + LINE_HEIGHT_LABEL

  data.forEach((field) => {
    // Wrap label text if needed
    const labelLines = doc.splitTextToSize(field.label, maxWidthLabel)
    doc.text(labelLines, MARGIN_LEFT, yPos)

    if (field.value) {
      // Wrap value text if needed
      const valueStr = String(field.value)
      const valueLines = doc.splitTextToSize(valueStr, maxWidthValue)
      doc.text(valueLines, MARGIN_LEFT_VALUE, yPos)

      // Adjust Y-position based on value height
      const valueHeight = valueLines.length * LINE_HEIGHT_VALUE
      yPos += valueHeight + (LINE_HEIGHT_LABEL - LINE_HEIGHT_VALUE)
    } else {
      // Only label is present, adjust Y-position accordingly
      const labelHeight = (labelLines.length - 1) * LINE_HEIGHT_VALUE
      yPos += LINE_HEIGHT_LABEL + labelHeight
    }
  })
  // Return final Y-position with some extra spacing
  return yPos + LINE_HEIGHT_LABEL
}

const formatValue = (
  value: string | number | undefined | null,
  defaultValue = "-"
) => {
  if (!value) return defaultValue
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return formatDate(value)
  }
  return String(value).charAt(0).toUpperCase() + String(value).slice(1)
}

const createPdf = (
  caseData?: Components.Schemas.Case,
  hoaData?: Components.Schemas.HomeownerAssociation
) => {
  if (!caseData || !hoaData) return

  // -------------------- Layout -------------------- //
  const doc = new jsPDF()
  // Page width
  const pageWidth = doc.internal.pageSize.width - MARGIN_LEFT - MARGIN_RIGHT

  // Add Amsterdam logo 1959x1419
  doc.addImage(amsterdam, "png", 12, 8, 58, 42)

  // Add custom fonts
  doc.addFileToVFS("Amsterdam-Regular-normal.ttf", FONT_REGULAR)
  doc.addFont("Amsterdam-Regular-normal.ttf", "Amsterdam-Regular", "normal")
  doc.addFileToVFS("Amsterdam-Bold-bold.ttf", FONT_BOLD)
  doc.addFont("Amsterdam-Bold-bold.ttf", "Amsterdam-Bold", "bold")

  // Title document
  const isActivatieteam = caseData.application_type === "Activatieteam"
  const docTitle = isActivatieteam ? "Activatieteam" : "Verduurzamingsadvies"
  doc.setFont("Amsterdam-Bold", "bold")
  doc.setFontSize(FONT_SIZE_TITLE)
  doc.text(docTitle, MARGIN_LEFT, 49)

  // Subtitle vve name
  doc.setFont("Amsterdam-Regular", "normal")
  doc.setFontSize(FONT_SIZE_NORMAL)

  let startY = 60

  const linesForHoaName = doc.splitTextToSize(hoaData.name, pageWidth)
  doc.text(linesForHoaName, MARGIN_LEFT, startY)
  startY += linesForHoaName.length * LINE_HEIGHT_VALUE + LINE_HEIGHT_LABEL

  // -------------------- Zaakdetails -------------------- //
  const caseDescriptionFields = [
    { label: "Zaak ID:", value: formatValue(caseData.prefixed_dossier_id) }
  ]
  if (isActivatieteam) {
    const activationTeamFields = [
      {
        label: "Soort bijeenkomst:",
        value: formatValue(caseData.activation_team?.type)
      },
      {
        label: "Datum bijeenkomst:",
        value: formatValue(caseData.activation_team?.meeting_date)
      },
      {
        label: "Onderwerp:",
        value: formatValue(caseData.activation_team?.subject)
      }
    ]
    caseDescriptionFields.push(...activationTeamFields)
  } else {
    caseDescriptionFields.push({
      label: "Adviestype:",
      value: formatValue(caseData.advice_type)
    })
  }

  startY = addDescription(doc, "Zaakdetails", caseDescriptionFields, startY)

  // -------------------- Vve gegevens -------------------- //
  const hoaDescriptionFields = [
    { label: "Postcode:", value: formatValue(hoaData.zip_code) },
    { label: "Stadsdeel:", value: formatValue(hoaData.district) },
    { label: "Wijk:", value: formatValue(hoaData.wijk) },
    { label: "Buurt:", value: formatValue(hoaData.neighborhood) },
    {
      label: "Prioriteitsbuurt:",
      value: hoaData.is_priority_neighborhood ? "Ja" : "Nee"
    },
    { label: "Bouwjaar:", value: formatValue(hoaData.build_year) },
    {
      label: "Aantal woningen:",
      value: formatValue(hoaData.number_of_apartments)
    },
    { label: "Monument status:", value: formatValue(hoaData.monument_status) },
    {
      label: "Beschermd stadsdorpsgezicht:",
      value: formatValue(hoaData.beschermd_stadsdorpsgezicht)
    },
    {
      label: "Ligt in beschermd gebied:",
      value: formatValue(hoaData.ligt_in_beschermd_gebied)
    }
  ]

  startY = addDescription(doc, "Vve-gegevens", hoaDescriptionFields, startY)

  // -------------------- Contactpersonen -------------------- //
  const contacts = hoaData.contacts.map((contact) => ({
    label: `- ${contact.fullname} (${contact.role}) - ${contact.email} - ${contact.phone}`
  }))

  startY = addDescription(doc, "Contactpersonen", contacts, startY)

  // -------------------- Eigenaren -------------------- //
  const hoaDataOwners = hoaData?.owners ?? []
  const owners = hoaDataOwners.map((owner) => ({
    label: `- ${owner?.name ?? "Onbekend"} (${owner.type}) - ${owner.number_of_apartments} ${owner.number_of_apartments === 1 ? "woning" : "woningen"}`
  }))
  addDescription(doc, "Eigenaren", owners, startY)

  // PDF downloaden
  doc.save(`ZWD-${caseData.prefixed_dossier_id}.pdf`)
}

export default createPdf
