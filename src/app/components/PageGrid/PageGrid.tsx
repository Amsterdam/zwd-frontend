import { Grid } from "@amsterdam/design-system-react"

type Props = {
  children: React.ReactNode[]
}

export const PageGrid: React.FC<Props> = ({ children }) => (
  <Grid>
    {children.map((child, index) => (
      <Grid.Cell key={index} span="all">
        {child}
      </Grid.Cell>
    ))}
  </Grid>
)

export default PageGrid
