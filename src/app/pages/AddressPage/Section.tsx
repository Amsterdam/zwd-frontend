type SectionProps = {
  children: React.ReactNode
}

export const Section: React.FC<SectionProps> = ({ children }) => (
  <div style={{ marginTop: "2rem" }}>{children}</div>
)

export default Section
