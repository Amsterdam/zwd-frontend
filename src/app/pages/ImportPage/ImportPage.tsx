import { useState, useEffect, useMemo } from "react"
import { PageGrid, PageHeading, Form, FormActionButtons } from "app/components"
import { useLetterImport, useCourseParticipantImport } from "app/state/rest"
import {
  ErrorMessage,
  Field,
  Label,
  Select,
  Accordion,
  OrderedList,
  Button,
  Row
} from "@amsterdam/design-system-react"
import {
  DocumentCheckMarkIcon,
  DocumentIcon,
  DownloadIcon
} from "@amsterdam/design-system-react-icons"
import { useUserFullName } from "app/hooks"
import ImportResult from "./ImportResult"
import { FileInputFieldCSV } from "app/components/forms"
import { downloadCsv } from "app/utils/files"
import {
  ImportType,
  ImportFormData,
  ImportResultData,
  importTypeRegistry,
  ImportTypeConfig
} from "./config/importTypes"
import type { FieldValues, UseFormReturn } from "react-hook-form"

type ImportTypeWithEmpty = ImportType | ""

// Wrapper component to receive formMethods from Form and pass to FormFieldsComponent.
const FormFieldsWrapper: React.FC<{
  config: ImportTypeConfig
  name: string
  formMethods?: UseFormReturn<FieldValues>
}> = ({ config, formMethods }) => (
  <config.FormFieldsComponent formMethods={formMethods} />
)

const ImportTypeSelect: React.FC<{
  value: ImportTypeWithEmpty
  onChange: (value: ImportTypeWithEmpty) => void
}> = ({ value, onChange }) => (
  <Field>
    <Label htmlFor="importType">Type</Label>
    <Select
      id="importType"
      value={value}
      onChange={(e) => onChange(e.target.value as ImportTypeWithEmpty)}
    >
      <Select.Option value="">Maak een keuze</Select.Option>
      {Object.values(importTypeRegistry).map((config) => (
        <Select.Option key={config.value} value={config.value}>
          {config.label}
        </Select.Option>
      ))}
    </Select>
  </Field>
)

export const ImportPage: React.FC = () => {
  const [importType, setImportType] = useState<ImportTypeWithEmpty>("")
  const [importResult, setImportResult] = useState<ImportResultData | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const userFullName = useUserFullName()

  const [, { execPost: execLetterImport }] = useLetterImport({ lazy: true })
  const [, { execPost: execCourseParticipantImport }] =
    useCourseParticipantImport({ lazy: true })

  const importConfig = importType ? importTypeRegistry[importType] : null

  const defaultValues = useMemo(
    () =>
      importConfig ? importConfig.getDefaultValues(userFullName) : undefined,
    [importConfig, userFullName]
  )

  const onSubmit = async (data: ImportFormData) => {
    if (!importType || !importConfig) {
      setError("Selecteer een import type")
      return
    }

    setIsSubmitting(true)
    setError(null)
    setImportResult(null)

    const formData = importConfig.buildFormData(data as ImportFormData)

    let response: unknown
    if (importType === "letters") {
      response = await execLetterImport(
        formData as unknown as Partial<ImportResultData>
      )
    } else if (importType === "course-participants") {
      response = await execCourseParticipantImport(
        formData as unknown as Partial<ImportResultData>
      )
    } else {
      throw new Error("Onbekend import type")
    }

    const result =
      (response as { data?: ImportResultData })?.data ??
      (response as ImportResultData)
    if (result) {
      setImportResult(result)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setError("Er is een fout opgetreden bij het importeren")
    }

    setIsSubmitting(false)
  }

  const handleReset = () => {
    setImportResult(null)
    setError(null)
    setImportType("")
  }

  const handleDownloadFailedRows = () => {
    if (importResult?.failed_rows_data) {
      const { headers, rows } = importResult.failed_rows_data
      const importLabel =
        importTypeRegistry[importType as ImportType].labelShort.toLowerCase()
      const filename = `zwd-${importLabel}-fouten-${new Date().toISOString().split("T")[0]}.csv`
      downloadCsv(headers, rows, filename)
    }
  }

  useEffect(() => {
    if (importType) {
      setImportResult(null)
      setError(null)
    }
  }, [importType])

  if (importResult) {
    const hasFailedRows =
      importResult.failed_rows_data &&
      importResult.failed_rows_data.rows.length > 0

    return (
      <PageGrid>
        <PageHeading label="Resultaten import" icon={DocumentCheckMarkIcon} />
        <ImportResult result={importResult} />
        <Row>
          {hasFailedRows && (
            <Button
              variant="primary"
              onClick={handleDownloadFailedRows}
              icon={DownloadIcon}
              iconBefore
            >
              Download fouten
            </Button>
          )}
          <Button variant="secondary" onClick={handleReset}>
            Nieuwe import starten
          </Button>
        </Row>
      </PageGrid>
    )
  }

  return (
    <PageGrid>
      <PageHeading label="Import" icon={DocumentIcon} />

      <ImportTypeSelect value={importType} onChange={setImportType} />

      {importConfig && (
        <div style={{ maxWidth: "40rem" }}>
          <importConfig.InstructionsComponent />

          <Accordion headingLevel={3}>
            <Accordion.Section label="Hoe exporteer ik een CSV-bestand vanuit Excel?">
              <OrderedList>
                <OrderedList.Item>Open het Excel-document</OrderedList.Item>
                <OrderedList.Item>
                  Ga naar Bestand → Opslaan als
                </OrderedList.Item>
                <OrderedList.Item>
                  Kies het bestandsformaat &quot;CSV (komma&apos;s gescheiden)
                  (*.csv)&quot;
                </OrderedList.Item>
                <OrderedList.Item>Sla het bestand op</OrderedList.Item>
              </OrderedList>
            </Accordion.Section>
          </Accordion>

          <Form<ImportFormData>
            key={importType}
            defaultValues={defaultValues}
            onSubmit={onSubmit}
          >
            <FileInputFieldCSV
              name="file"
              label="CSV bestand"
              validation={{
                required: true
              }}
            />

            <FormFieldsWrapper config={importConfig} name="formFieldsWrapper" />

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <FormActionButtons
              name="actions"
              okText="Importeren"
              cancelText="Annuleer"
              loading={isSubmitting}
              onCancel={() => setImportType("")}
            />
          </Form>
        </div>
      )}
    </PageGrid>
  )
}

export default ImportPage
