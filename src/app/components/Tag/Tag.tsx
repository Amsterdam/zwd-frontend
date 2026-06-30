import { ReactNode } from "react"
import styles from "./styles.module.css"

const colorMap = {
  black: "#000000",
  blue: "#1677FF",
  purple: "#722ED1",
  cyan: "#13C2C2",
  green: "#52C41A",
  magenta: "#EB2F96",
  pink: "#EB2F96",
  red: "#F5222D",
  orange: "#FA8C16",
  yellow: "#FADB14",
  volcano: "#FA541C",
  geekblue: "#2F54EB",
  gold: "#FAAD14",
  lime: "#A0D911"
} as const

type TagColor = keyof typeof colorMap

type TagProps = {
  children: ReactNode
  color: TagColor
}

const withAlpha = (hex: string, alpha: number = 0.08): string =>
  `rgba(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}, ${alpha})`

const Tag: React.FC<TagProps> = ({ color, children }) => {
  if (!children) return null
  const hexColor = colorMap[color] ?? colorMap.black
  const backgroundColor = withAlpha(hexColor)

  return (
    <span
      className={styles.tag}
      style={{ color: hexColor, borderColor: hexColor, backgroundColor }}
    >
      {children}
    </span>
  )
}

const statusColorMap: Record<string, TagColor> = {
  "Aanvraag invoeren": "red",
  Volledigheid: "geekblue",
  Beoordelen: "orange",
  "Toegekend aan adviseur": "green",
  Evaluatie: "purple"
}

type StatusTagProps = {
  status?: string
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  if (!status) return null
  const color = statusColorMap[status] ?? "black"
  return <Tag color={color}>{status}</Tag>
}

export { StatusTag, Tag }
