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
