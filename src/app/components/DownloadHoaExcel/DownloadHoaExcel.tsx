import { useContext, useState } from "react"
import { Button } from "@amsterdam/design-system-react"
import { DownloadIcon } from "@amsterdam/design-system-react-icons"
import { saveAs } from "file-saver"
import { useAuth } from "react-oidc-context"
import { ContextValues } from "app/state/context/ValueProvider"
import { createExcel } from "./createExcel"
import type { ExpandedHoa } from "./createExcel"
import stringifyQueryParams from "app/routing/utils/stringifyQueryParams"
import { cleanParamObject, getOrderingQueryParam } from "app/state/rest/utils"
import { makeApiUrl } from "app/state/rest/hooks/utils"
import { Spinner } from "app/components"
import { SORTING_INDEX_MAPPING } from "app/state/rest"

const PAGE_SIZE = 1000

const buildQueryString = (params: Record<string, unknown>, page: number) => {
  const queryParams = {
    ...params,
    page,
    page_size: PAGE_SIZE,
  }
  return stringifyQueryParams(cleanParamObject(queryParams))
}

const fetchHoasByPage = async (url: string, token?: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export const DownloadHoaExcel = () => {
  const auth = useAuth()
  const token = auth.user?.access_token
  const {
    searchString,
    district,
    isSmallHoa,
    participantCount,
    letterCount,
    neighborhood,
    sorting,
  } = useContext(ContextValues)["hoa"]
  const [loading, setLoading] = useState(false)

  const queryParams = {
    searchString,
    district,
    isSmallHoa,
    course_participant_count: participantCount,
    letter_count: letterCount,
    neighborhood,
    ordering: sorting
      ? getOrderingQueryParam(sorting, SORTING_INDEX_MAPPING)
      : undefined,
  }

  const fetchAllHoas = async () => {
    setLoading(true)
    try {
      let allResults: ExpandedHoa[] = []
      const initialQueryString = buildQueryString(queryParams, 1)
      const initialUrl = `${makeApiUrl("homeowner-association")}${initialQueryString}`

      // First request to determine the total number of items
      const initialData = await fetchHoasByPage(initialUrl, token)
      const totalItems = initialData.count
      const totalPages = Math.ceil(totalItems / PAGE_SIZE)
      allResults = [...initialData.results]

      // Fetch the rest of the pages
      const fetchPagePromises = []
      for (let page = 2; page <= totalPages; page++) {
        const queryString = buildQueryString(queryParams, page)
        const url = `${makeApiUrl("homeowner-association")}${queryString}`
        fetchPagePromises.push(fetchHoasByPage(url, token))
      }

      const pageResults = await Promise.all(fetchPagePromises)
      pageResults.forEach((data) => {
        allResults = [...allResults, ...data.results]
      })

      // Create Excel and trigger download
      const workbook = createExcel(allResults)
      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
      saveAs(blob, "ZWD-vve.xlsx")
    } catch (error) {
      console.error("Error fetching all hoas:", error)
    }
    setLoading(false)
  }

  return (
    <Button
      id="export-excel-button"
      variant="secondary"
      icon={loading ? <Spinner size={23} /> : <DownloadIcon />}
      iconBefore
      onClick={fetchAllHoas}
      disabled={loading}
    >
      Download Excel
    </Button>
  )
}
