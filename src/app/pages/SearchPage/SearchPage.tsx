import { useCallback, useState } from "react"
import debounce from "lodash.debounce"
import { Label, SearchField, Switch } from "@amsterdam/design-system-react"
import { SearchIcon } from "@amsterdam/design-system-react-icons"
import SearchResults from "./SearchResults/SearchResults"
import { PageGrid, PageHeading } from "app/components"
import { useURLState } from "app/hooks"
import styles from "./SearchPage.module.css"
import SearchResultsVve from "./SearchResultsHoa/SearchResultsHoa"

const DELAY = 750

export const SearchPage: React.FC = () => {
  const [searchString, setSearchString] = useURLState("q", "")
  const [debouncedSearchString, setDebouncedSearchString] =
    useState<string>(searchString)
  const [isVveSearch, setIsVveSearch] = useURLState("isVve", "false")

  // Memoize the debounced function to prevent recreation on every render
  const debouncedSetValue = useCallback(
    debounce((value: string) => setDebouncedSearchString(value), DELAY),
    []
  )

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchString(value)
    debouncedSetValue(value)
  }

  const isSearchVve = isVveSearch === "true"
  const label = isSearchVve ? "VvE zoeken" : "Adres zoeken"
  const placeholder = isSearchVve
    ? "Zoek op VvE naam"
    : "Zoek op postcode of straat"

  return (
    <PageGrid>
      <PageHeading label={label} icon={SearchIcon} />
      <div className={styles.searchContainer}>
        <SearchField
          onSubmit={(e) => e.preventDefault()}
          className={styles.searchField}
        >
          <SearchField.Input
            placeholder={placeholder}
            name="search-box"
            onChange={onChange}
            value={searchString}
          />
          <SearchField.Button />
        </SearchField>
        <div className={styles.switchContainer}>
          <Label htmlFor="switch-voor-zoeken-op-vve-naam">
            Zoek op VvE naam
          </Label>
          <Switch
            checked={isSearchVve}
            onChange={(el) => setIsVveSearch(el.target.checked.toString())}
          />
        </div>
      </div>
      {isSearchVve ? (
        <SearchResultsVve searchString={debouncedSearchString} />
      ) : (
        <SearchResults searchString={debouncedSearchString} />
      )}
    </PageGrid>
  )
}

export default SearchPage
