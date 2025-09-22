import { useState } from "react"
import { IconButton } from "@amsterdam/design-system-react"
import {
  CopyIcon,
  CheckMarkCircleIcon
} from "@amsterdam/design-system-react-icons"

type Props = {
  email: string
  name: string
}

export const CopyEmailButton = ({ email, name }: Props) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${name} <${email}>`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <IconButton
      data-testid="copy-email-button"
      label={copied ? "Gekopieerd" : "Kopieer e-mailadres"}
      title={copied ? "Gekopieerd" : "Kopieer e-mailadres"}
      svg={copied ? CheckMarkCircleIcon : CopyIcon}
      onClick={handleCopy}
      style={{
        color: copied ? "var(--ams-color-highlight-green)" : undefined,
        transition: "transform 0.2s ease, color 0.3s ease",
        transform: copied ? "scale(1.2)" : "scale(1)"
      }}
      size="large"
    />
  )
}

export default CopyEmailButton
