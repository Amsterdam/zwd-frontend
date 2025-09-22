import { SyntheticEvent } from "react"

export const withExceptionCapturing =
  <T>(handler: (event: SyntheticEvent) => Promise<T>) =>
  (event: SyntheticEvent) => {
    if (handler) {
      handler(event).catch((error) => {
        console.log("Unexpected error:", error)
      })
    }
  }

export default withExceptionCapturing
