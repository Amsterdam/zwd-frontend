export const stringifyQueryParams = (
  params: Record<string, string | number | undefined>,
  addQueryPrefix = true
) => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  return addQueryPrefix ? `?${queryString}` : queryString
}

export default stringifyQueryParams
