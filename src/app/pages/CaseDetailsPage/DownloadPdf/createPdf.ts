import { jsPDF } from "jspdf"
import amsterdam from "./assets/amsterdam.png"
import { FONT_REGULAR, FONT_BOLD } from "./fonts"

const FONT_SIZE_TITLE = 24
const FONT_SIZE_NORMAL = 10
const MARGIN_LEFT = 30 // Margin left for the text
const MARGIN_LEFT_VALUE = 85 // Margin left for the value after the first text
const MARGIN_RIGHT = MARGIN_LEFT // Margin right for the maxWidth / pageWidth
const LINE_HEIGHT = 6 // Line height for the text

type Data = {
  label: string
  value?: string | number
}[]

// Calculate the Y position for the next row to start.
// Two extra lines are added; one for the title and one for margin-top
const calculateYPos = (startY: number, prevRowLength: number) =>
  startY + (prevRowLength + 2) * LINE_HEIGHT

const addDescription = (
  doc: jsPDF,
  title: string,
  data: Data,
  startY: number
) => {
  // Header
  doc.setFont("Amsterdam-Bold", "bold")
  doc.setFontSize(FONT_SIZE_NORMAL)
  doc.text(title, MARGIN_LEFT, startY)

  // Paragraph
  doc.setFont("Amsterdam-Regular", "normal")
  doc.setFontSize(FONT_SIZE_NORMAL)

  const MaxPageWidthRight =
    doc.internal.pageSize.width - MARGIN_RIGHT - MARGIN_LEFT_VALUE

  data.forEach((field, index) => {
    const yPos = startY + (index + 1) * LINE_HEIGHT
    doc.text(field.label, MARGIN_LEFT, yPos)
    if (field.value) {
      doc.text(`${field.value}`, MARGIN_LEFT_VALUE, yPos, {
        maxWidth: MaxPageWidthRight
      })
    }
  })
}

const formatValue = (
  value: string | number | undefined | null,
  defaultValue = "-"
) => {
  if (!value) return defaultValue
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

  // Title "Verduurzamingsadvies"
  doc.setFont("Amsterdam-Bold", "bold")
  doc.setFontSize(FONT_SIZE_TITLE)
  doc.text("Verduurzamingsadvies", MARGIN_LEFT, 49)

  // Subtitle vve name
  doc.setFont("Amsterdam-Regular", "normal")
  doc.setFontSize(FONT_SIZE_NORMAL)
  doc.text(hoaData.name, MARGIN_LEFT, 60, { maxWidth: pageWidth })

  // -------------------- Zaakdetails -------------------- //
  const caseDescriptionFields = [
    { label: "Zaak ID:", value: formatValue(caseData.prefixed_dossier_id) },
    { label: "Advies type:", value: formatValue(caseData.advice_type) }
  ]

  let startY = 80
  addDescription(doc, "Zaakdetails", caseDescriptionFields, startY)

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
      value: formatValue(hoaData.number_of_appartments)
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

  startY = calculateYPos(startY, caseDescriptionFields.length)
  addDescription(doc, "Vve-gegevens", hoaDescriptionFields, startY)

  // -------------------- Contactpersonen -------------------- //
  startY = calculateYPos(startY, hoaDescriptionFields.length)
  const contacts = hoaData.contacts.map((contact) => ({
    label: `- ${contact.fullname} (${contact.role}) - ${contact.email} - ${contact.phone}`
  }))

  addDescription(doc, "Contactpersonen", contacts, startY)

  // -------------------- Eigenaren -------------------- //
  startY = calculateYPos(startY, contacts.length)
  const hoaDataOwners = hoaData?.owners ?? []
  const owners = hoaDataOwners.map((owner) => ({
    label: `- ${owner?.name ?? "Onbekend"} (${owner.type}) - ${owner.number_of_appartments} ${owner.number_of_appartments === 1 ? "woning" : "woningen"}`
  }))
  addDescription(doc, "Eigenaren", owners, startY)

  // PDF downloaden
  // doc.save("voorbeeld.pdf")

  doc.output("dataurlnewwindow", { filename: `ZWD-ZAAK-${caseData.id}.pdf` })
}

export default createPdf
