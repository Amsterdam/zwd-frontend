import { AspectRatio, Grid, SearchField, Image, Overlap } from "@amsterdam/design-system-react"

export const SearchPage: React.FC = () => (
  <Overlap>
    <AspectRatio ratio="2x-wide">
      <Image
        alt=""
        cover
        sizes="(max-width: 36rem) 640px, (max-width: 68rem) 1280px, 1600px"
        src="https://picsum.photos/1600/500"
        srcSet="https://picsum.photos/640/200 640w, https://picsum.photos/1280/400 1280w, https://picsum.photos/1600/500 1600w"
      />
    </AspectRatio>
    <Grid
      style={{
        alignSelf: "center"
      }}
    >
      <Grid.Cell
        span={{
          medium: 6,
          narrow: 4,
          wide: 8
        }}
        start={{
          medium: 2,
          narrow: 1,
          wide: 3
        }}
      >
        <SearchField onSubmit={function Qa(){}}>
          <SearchField.Input
            label="Zoeken"
            placeholder="Zoek op adres, straat of postcode"
          />
          <SearchField.Button />
        </SearchField>
      </Grid.Cell>
    </Grid>
  </Overlap>
)

export default SearchPage
    