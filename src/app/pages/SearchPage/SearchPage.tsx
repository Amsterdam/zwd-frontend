import { useCallback, useState } from "react"
import debounce from "lodash.debounce"
import { SearchField } from "@amsterdam/design-system-react"
import SearchResults from "./SearchResults/SearchResults"
import { PageHeading } from "app/components"
import { useURLState } from "app/hooks"
import { Grid } from "@amsterdam/design-system-react"

const DELAY = 750

export const SearchPage: React.FC = () => {
  const [searchString, setSearchString] = useURLState("q", "")
  const [debouncedSearchString, setDebouncedSearchString] = useState<string>(searchString)
  
  // Memoize the debounced function to prevent recreation on every render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetValue = useCallback(
    debounce((value: string) => setDebouncedSearchString(value), DELAY),
    []
  )

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchString(value)
    debouncedSetValue(value)
  }

  return (
    <Grid>
      <Grid.Cell span="all">
        <PageHeading label="Adres zoeken" />
      </Grid.Cell>
      <Grid.Cell span="all">
      <SearchField onSubmit={(e) => e.preventDefault() }  style={{ width: 600, marginBottom: "2rem" }}>
        <SearchField.Input
          placeholder="Zoek op postcode of straat"
          name="search-box"
          onChange={ onChange }
          value={ searchString }
        />
        <SearchField.Button />
      </SearchField>
      <SearchResults searchString={ debouncedSearchString } />
      </Grid.Cell>
    </Grid>
  )
}

export default SearchPage
    