import { Field, Label, SearchField } from "@amsterdam/design-system-react"

type Props = {
  onSearch: (value: string) => void
  placeholder?: string
}

export const Search: React.FC<Props> = ({ onSearch, placeholder }) => {
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
      <Label htmlFor="search-box">Zoeken</Label>
      <SearchField onSubmit={onSubmit} style={{ width: 400 }}>
        <SearchField.Input
          placeholder={placeholder}
          name="search-box"
          onChange={onChange}
        />
        <SearchField.Button />
      </SearchField>
    </Field>
  )
}

export default Search
