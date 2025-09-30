import { useContext, useState } from "react"
import { Button } from "@amsterdam/design-system-react"
import { DownloadIcon } from "@amsterdam/design-system-react-icons"
import { saveAs } from "file-saver"
import { useAuth } from "react-oidc-context"
import { ContextValues } from "app/state/context/ValueProvider"
import { createExcel } from "./createExcel"
import type { ExpandedCase } from "./createExcel"
import { SORTING_INDEX_MAPPING } from "app/state/rest"
import stringifyQueryParams from "app/routing/utils/stringifyQueryParams"
import { cleanParamObject, getOrderingQueryParam } from "app/state/rest/utils"
import { makeApiUrl } from "app/state/rest/hooks/utils"
import { Spinner } from "app/components"

const PAGE_SIZE = 1000

const buildQueryString = (params: Record<string, unknown>, page: number) => {
  const queryParams = {
    ...params,
    expand: "true",
    page,
    page_size: PAGE_SIZE,
  }
  return stringifyQueryParams(cleanParamObject(queryParams))
}

const fetchCasesByPage = async (url: string, token?: string) => {
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

export const DownloadExcel = () => {
  const auth = useAuth()
  const token = auth.user?.access_token
  const {
    adviceType,
    applicationType,
    requestDateRangeAfter,
    requestDateRangeBefore,
    district,
    endDateRangeAfter,
    endDateRangeBefore,
    isClosedFilter,
    isSmallHoa,
    neighborhood,
    advisor,
    searchString,
    sorting,
    status,
    wijk,
  } = useContext(ContextValues)["cases"]
  const [loading, setLoading] = useState(false)

  const queryParams = {
    advice_type: adviceType,
    application_type: applicationType,
    request_date_range_after: requestDateRangeAfter,
    request_date_range_before: requestDateRangeBefore,
    end_date_range_after: endDateRangeAfter,
    end_date_range_before: endDateRangeBefore,
    closed: isClosedFilter,
    district,
    is_small_hoa: isSmallHoa,
    neighborhood,
    advisor,
    search: searchString,
    status,
    wijk,
    ordering: sorting
      ? getOrderingQueryParam(sorting, SORTING_INDEX_MAPPING)
      : undefined,
  }

  const fetchAllCases = async () => {
    setLoading(true)
    try {
      let allResults: ExpandedCase[] = []
      const initialQueryString = buildQueryString(queryParams, 1)
      const initialUrl = `${makeApiUrl("cases")}${initialQueryString}`

      // First request to determine the total number of items
      const initialData = await fetchCasesByPage(initialUrl, token)
      const totalItems = initialData.count
      const totalPages = Math.ceil(totalItems / PAGE_SIZE)
      allResults = [...initialData.results]

      // Fetch the rest of the pages
      const fetchPagePromises = []
      for (let page = 2; page <= totalPages; page++) {
        const queryString = buildQueryString(queryParams, page)
        const url = `${makeApiUrl("cases")}${queryString}`
        fetchPagePromises.push(fetchCasesByPage(url, token))
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
      saveAs(blob, "ZWD-Zaken.xlsx")
    } catch (error) {
      console.error("Error fetching all cases:", error)
    }
    setLoading(false)
  }

  return (
    <Button
      id="export-excel-button"
      variant="secondary"
      icon={loading ? <Spinner size={23} /> : <DownloadIcon />}
      iconBefore
      onClick={fetchAllCases}
      disabled={loading}
    >
      Download Excel
    </Button>
  )
}
