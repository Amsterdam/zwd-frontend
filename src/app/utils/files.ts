import { useCallback } from "react"
import { useAuth } from "react-oidc-context"
import axios, { AxiosError, AxiosResponse } from "axios"

/**
 * Validates that the input is a Blob.
 */
const isValidBlob = (data: unknown): data is Blob => {
  const valid = data instanceof Blob
  if (!valid) {
    console.error("Invalid data provided. Expected a Blob.")
  }
  return valid
}

export const downloadFile = (data: unknown, filename: string): void => {
  if (!isValidBlob(data)) return

  const blobUrl = URL.createObjectURL(data)
  const anchor = document.createElement("a")

  anchor.href = blobUrl
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()

  // Clean up the blob URL after a short delay to ensure the download starts
  setTimeout(() => URL.revokeObjectURL(blobUrl), 1000)
}

export const viewFile = (data: unknown): void => {
  if (!isValidBlob(data)) return
  const blobUrl = URL.createObjectURL(data)

  try {
    const newTab = window.open(blobUrl, "_blank")

    if (!newTab) {
      console.error(
        "Failed to open the file in a new tab. Please check your browser's pop-up settings."
      )
      URL.revokeObjectURL(blobUrl) // Clean up if tab didn't open
      return
    }

    // Clean up after the new tab has loaded
    newTab.onload = () => {
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000)
    }
  } catch (err) {
    URL.revokeObjectURL(blobUrl)
    console.error("Error viewing file:", err)
  }
}

export const useFetchFile = (fileUrl: string) => {
  const auth = useAuth()
  const token = auth.user?.access_token

  const fetchFile = useCallback(async () => {
    try {
      const response: AxiosResponse = await axios.get(fileUrl, {
        responseType: "blob", // Important to ensure the file is received as a blob
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data as Blob
    } catch (error: unknown) {
      const axiosError = error as AxiosError
      throw new Error(axiosError.message)
    }
  }, [token, fileUrl])

  return fetchFile
}

/**
 * Determines whether a file can be opened inline in the browser based on its file extension.
 * Supports common types like pdf, images, text files, etc.
 */
export const canViewInline = (url: string): boolean => {
  const extension = url
    .split("?")[0]
    .split("#")[0]
    .split(".")
    .pop()
    ?.toLowerCase()

  if (!extension) {
    return false
  }

  const viewableExtensions = [
    "pdf",
    "png",
    "jpg",
    "jpeg",
    "gif",
    "txt",
    "html",
    "svg",
    "webp"
  ]

  return viewableExtensions.includes(extension)
}

/**
 * Escapes a CSV field value by wrapping it in quotes if necessary
 * and escaping internal quotes by doubling them.
 */
const escapeCsvField = (value: string): string => {
  // If the value contains comma, newline, quote, or space, wrap in quotes
  // Spaces are quoted to prevent CSV readers from treating them as delimiters
  if (value.includes(",") || value.includes("\n") || value.includes('"') || value.includes(" ")) {
    // Escape internal quotes by doubling them
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

/**
 * Converts an array of objects with headers to a CSV string and downloads it.
 * @param headers Array of header names
 * @param rows Array of objects where keys match header names
 * @param filename Name of the file to download
 */
export const downloadCsv = (
  headers: string[],
  rows: Record<string, string>[],
  filename: string
): void => {
  // Create CSV content
  const csvLines: string[] = []

  // Add header row
  csvLines.push(headers.map(escapeCsvField).join(","))

  // Add data rows
  for (const row of rows) {
    const values = headers.map((header) => {
      const value = row[header] ?? ""
      return escapeCsvField(value)
    })
    csvLines.push(values.join(","))
  }

  // Create blob and download
  const csvContent = csvLines.join("\n")
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  downloadFile(blob, filename)
}
