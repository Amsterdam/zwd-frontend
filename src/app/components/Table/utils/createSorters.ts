import { getValueByPath } from "app/utils/getValueByPath"

export function createStringSorter<T>(path: string): (a: T, b: T) => number {
  return (a: T, b: T) => {
    const valA = getValueByPath(a, path)
    const valB = getValueByPath(b, path)

    if (!valA && !valB) return 0
    if (!valA) return 1
    if (!valB) return -1

    return String(valA).localeCompare(String(valB))
  }
}

export function createDateSorter<T>(path: string): (a: T, b: T) => number {
  return (a: T, b: T) => {
    const valA = getValueByPath(a, path) as string
    const valB = getValueByPath(b, path) as string

    if (!valA && !valB) return 0
    if (!valA) return 1
    if (!valB) return -1

    return new Date(valA).getTime() - new Date(valB).getTime()
  }
}

export function createnumberSorter<T>(path: string): (a: T, b: T) => number {
  return (a: T, b: T) => {
    const valA = getValueByPath(a, path) as number
    const valB = getValueByPath(b, path) as number

    return valA - valB
  }
}

export function getSortOrder(
  sorting: TABLE.Sorting,
  targetDataIndex: string
): TABLE.SortOrder | undefined {
  return sorting.dataIndex === targetDataIndex ? sorting.order : undefined
}
