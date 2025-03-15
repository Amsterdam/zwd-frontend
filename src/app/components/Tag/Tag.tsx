import { ReactNode } from "react"
import styles from "./styles.module.css"

const colorMap: Record<string, string> = {
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
}

type TagProps = {
  children: ReactNode
  color: keyof typeof colorMap
}

const getColorHex = (colorName: string): string => colorMap[colorName] || colorMap["black"]

const lightenColor = (hex: string, factor: number = 0.05): string =>
  `rgba(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}, ${factor})`

const Tag: React.FC<TagProps> = ({ color, children }) => {
  const hexColor = getColorHex(color)
  const backgroundColor = lightenColor(hexColor)

  return (
    <span
      className={styles.tag}
      style={{ color: hexColor, borderColor: hexColor, backgroundColor }}
    >
      {children}
    </span>
  )
}

const statusColorMap: Record<string, string> = {
  "Aanvraag invoeren": "red",
  Volledigheid: "geekblue",
  Beoordelen: "orange",
  "Toegekend aan adviseur": "green",
  Evaluatie: "purple"
}

type StatusTagProps = {
  status?: keyof typeof statusColorMap
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  if (!status) return null
  const color = statusColorMap[status] || "black"
  return <Tag color={color}>{status}</Tag>
}

export { Tag, StatusTag }
