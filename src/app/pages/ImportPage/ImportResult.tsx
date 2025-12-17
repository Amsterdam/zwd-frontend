import { Heading, Alert, Paragraph } from "@amsterdam/design-system-react"
import { Table } from "app/components"

type ImportResult = {
  counts?: Record<string, number>
  messages?: string[]
  warnings?: string[]
  errors?: Array<{
    row_number: number
    field?: string | null
    message: string
  }>
}

type ImportResultProps = {
  result: ImportResult
}

type RowError = {
  row_number: number
  field: string | null
  message: string
}


const ImportResult: React.FC<ImportResultProps> = ({ result }) => {
  const hasErrors = result.errors && result.errors.length > 0
  const hasCounts = result.counts && Object.keys(result.counts).length > 0

  // Check for CSV structure errors in the first row (missing required columns as heading names)
  const csvStructureError = result.errors?.find(
    (error) => error.row_number === 0
  )

  const errorColumns = [
    {
      header: "Rij",
      dataIndex: "row_number",
    },
    {
      header: "Kolomnaam",
      dataIndex: "field",
      render: (_text: string, record: RowError) => record.field || "–",
    },
    {
      header: "Foutmelding",
      dataIndex: "message",
    }
  ]

  return (
    <>
      {csvStructureError && (
        <Alert
          severity="error"
          heading="De structuur van het CSV-bestand is niet correct"
          headingLevel={2}
        >
          <Paragraph>
            <strong>Foutmelding:</strong><br />
            {csvStructureError.message}
          </Paragraph>
        </Alert>
      )}

      {hasCounts && !csvStructureError && (
        <Alert
          severity={hasErrors ? "warning" : "success"}
          heading={hasErrors ? "De import is deels geslaagd" : "De import is geslaagd"}
          headingLevel={2}
        >
          {hasErrors
            ?
              <Paragraph>
                Let op: <strong>{result.counts?.failed} van de {result.counts?.total} rijen</strong> konden niet worden geïmporteerd.<br/>
                Bekijk hieronder de specifieke fouten. Je kunt de data aanpassen en opnieuw importeren.
              </Paragraph>
            :
              <Paragraph>
                Alle <strong>{result.counts?.total} rijen</strong> zijn succesvol geïmporteerd.
              </Paragraph>
          }
        </Alert>
      )}

      {hasErrors && !csvStructureError && (
        <div style={{ marginTop: "2rem" }}>
          <Heading level={3} style={{ marginBottom: "1rem" }}>
            Fouten
          </Heading>
          <Table<RowError>
            columns={errorColumns}
            data={result.errors as RowError[]}
            pagination={{ pageSize: 100 }}
          />
        </div>
      )}
    </>
  )
}

export default ImportResult
