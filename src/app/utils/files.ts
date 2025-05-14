import { useCallback } from "react"
import { useAuth } from "react-oidc-context"
import axios, { AxiosError, AxiosResponse } from "axios"

export const downloadFile = (data: Blob, name: string) => {
  if (!(data instanceof Blob)) {
    console.error("Invalid data provided. Expected a Blob.")
    return
  }
  const url = URL.createObjectURL(data)
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", name)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const viewFile = (data: Blob) => {
  if (!(data instanceof Blob)) {
    console.error("Invalid data provided. Expected a Blob.")
    return
  }

  try {
    // Create a URL for the blob
    const url = URL.createObjectURL(data)
    const newWindow = window.open(url, "_blank")

    if (!newWindow) {
      console.error(
        "Failed to open the file in a new tab. Please check your browser's pop-up settings."
      )
      URL.revokeObjectURL(url) // Clean up immediately if the window couldn't be opened
      return
    }

    // Revoke the object URL after some time to free up memory
    newWindow.onload = () => {
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    }
  } catch (error) {
    console.error("Error viewing file:", error)
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
