import type { Options } from "."
import { useErrorHandler } from "./hooks/utils/errorHandler"
import useApiRequest from "./hooks/useApiRequest"
import qs from "qs"

// Constants
const PDOK_URL = "https://api.pdok.nl/bzk/locatieserver/search/v3_1"
const MUNICIPALITY_FILTER = "gemeentenaam:(amsterdam)"
const ADDRESS_FILTER = "AND (type:adres) AND (adrestype: hoofdadres)"
const DEFAULT_SORT = "score desc, weergavenaam asc"
const FIELD_LIST =
  "weergavenaam,adrestype,gemeentenaam,nummeraanduiding_id,adresseerbaarobject_id,straatnaam,huisnummer,huisletter,huisnummertoevoeging,postcode,woonplaatsnaam,centroide_ll,score"
const START = 0
const RESULTS_PER_PAGE = 25

// Helper function to construct query
const constructQuery = (searchString?: string): string =>
  qs.stringify(
    {
      q: searchString,
      fq: `${MUNICIPALITY_FILTER}${ADDRESS_FILTER}`,
      fl: FIELD_LIST,
      start: START.toString(),
      rows: RESULTS_PER_PAGE.toString(),
      sort: DEFAULT_SORT
    },
    {
      addQueryPrefix: true
    }
  )

// The pdok /suggest endpoint is used to get the address details by search string
export const useBagPdok = (searchString?: string, options?: Options) => {
  const handleError = useErrorHandler()
  const query = constructQuery(searchString)

  return useApiRequest<BAGPdokResponse>({
    url: `${PDOK_URL}/suggest${query}`,
    lazy: searchString === undefined,
    ...options,
    groupName: "bagPdok",
    handleError
  })
}

// The pdok /free endpoint is used to get the address details by bagId
export const useBagPdokByBagId = (searchString?: string, options?: Options) => {
  const handleError = useErrorHandler()
  const query = constructQuery(searchString)

  return useApiRequest<BAGPdokResponse>({
    url: `${PDOK_URL}/free${query}`,
    lazy: searchString === undefined,
    ...options,
    groupName: "bagPdok",
    handleError
  })
}
