import { Field, Label, SearchField } from "@amsterdam/design-system-react"

type Props = {
  onSearch: (value: string) => void
}

export const Search: React.FC<Props> = ({ onSearch }) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const value = formData.get("search-box")
    onSearch(value as string)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    if (!value) {
      onSearch("")
    }
  }

  return (
    <Field>
      <Label htmlFor="vve zoeken">Vve zoeken</Label>
      <SearchField onSubmit={onSubmit} style={{ width: 400 }}>
        <SearchField.Input
          placeholder="Zoek op vve statutaire naam"
          name="search-box"
          onChange={onChange}
        />
        <SearchField.Button />
      </SearchField>
    </Field>
  )
}

export default Search
