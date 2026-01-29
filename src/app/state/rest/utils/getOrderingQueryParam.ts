const SORTING_ORDER = {
  ASCEND: "ASCEND",
  DESCEND: "DESCEND"
}

export const getOrderingQueryParam = (
  sorting: { dataIndex?: string; order?: string },
  indexMapping: Record<string, string>
): string => {
  console.log("getOrderingQueryParam called with:", sorting, indexMapping);
  if (!sorting?.dataIndex) return ""

  const value = indexMapping[sorting.dataIndex] || ""
  if (!value) return ""

  return sorting.order === SORTING_ORDER.DESCEND ? `-${value}` : value
}

export default getOrderingQueryParam
