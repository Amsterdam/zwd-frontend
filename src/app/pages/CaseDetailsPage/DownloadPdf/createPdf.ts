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

const addDescription = (doc: jsPDF, title: string, data: Data, startY: number) => {
  // Header
  doc.setFont("Amsterdam-Bold", "bold")
  doc.setFontSize(FONT_SIZE_NORMAL)
  doc.text(title, MARGIN_LEFT, startY)

  // Paragraph
  doc.setFont("Amsterdam-Regular", "normal")
  doc.setFontSize(FONT_SIZE_NORMAL)

  data.forEach((field, index) => {
    const yPos = startY + (index + 1) * LINE_HEIGHT
    doc.text(field.label, MARGIN_LEFT, yPos)
    if (field.value) {
      doc.text(`${field.value}`, MARGIN_LEFT_VALUE, yPos)
    }
  })
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

  // -------------------- Vve gegevens -------------------- //
  const hoaDescriptionFields = [
    { label: "Postcode:", value: hoaData.zip_code ?? "-" },
    { label: "Wijk:", value: hoaData.wijk ?? "-" },
    { label: "Buurt:", value: hoaData.neighborhood ?? "-" },
    { label: "Prioriteitsbuurt:", value: hoaData.is_priority_neighborhood ? "Ja" : "Nee" },
    { label: "Stadsdeel:", value: hoaData.district ?? "-" },
    { label: "Bouwjaar:", value: hoaData.build_year ?? "-" },
    { label: "Aantal woningen:", value: hoaData.number_of_appartments ?? "-" },
    { label: "Monument status:", value: hoaData.monument_status ?? "-" },
    { label: "Beschermd stadsdorpsgezicht:", value: hoaData.beschermd_stadsdorpsgezicht ?? "-" },
    { label: "Ligt in beschermd gebied:", value: hoaData.ligt_in_beschermd_gebied ?? "-" }
  ]

  addDescription(doc, "Vve-gegevens", hoaDescriptionFields, 80)

  // -------------------- Contactpersonen -------------------- //
  const contacts = hoaData.contacts.map((contact) => ({
    label: `- ${contact.fullname} (${contact.role}) - ${contact.email} - ${contact.phone}`
  }))

  addDescription(doc, "Contactpersonen", contacts, 152)

  // -------------------- Zaakdetails -------------------- //
  const caseDescriptionFields = [
    { label: "Zaak ID:", value: caseData.id },
    { label: "Advies type:", value: caseData.advice_type },
    { label: "Beschrijving:", value: caseData.description ?? "-" }
  ]

  addDescription(doc, "Zaakdetails", caseDescriptionFields, 176)

  // PDF downloaden
  // doc.save("voorbeeld.pdf")

  doc.output("dataurlnewwindow")
}

export default createPdf
