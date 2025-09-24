import { useAuth } from "react-oidc-context"
import { jwtDecode } from "jwt-decode"

type DecodedToken = {
  given_name: string // firstname
  family_name: string // lastname
  name: string // lastname, firstname
  unique_name: string // email
  [key: string]: number | string | string[]
}

export const useDecodedToken = (): DecodedToken | undefined => {
  const auth = useAuth()
  const token = auth.user?.access_token

  if (!token) return

  const decoded = jwtDecode<DecodedToken>(token)
  return decoded
}

function parseName(nameString: string): string {
  const [lastName, firstName] = nameString
    .split(", ")
    .map((part) => part.trim())
  return `${firstName} ${lastName}`
}

export const useUserFullName = (): string | undefined => {
  const decodedToken = useDecodedToken()
  if (!decodedToken?.name) return undefined

  return parseName(decodedToken.name)
}
