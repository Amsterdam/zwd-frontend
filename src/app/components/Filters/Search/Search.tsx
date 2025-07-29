import { Field, Label, SearchField } from "@amsterdam/design-system-react"
import { ContextValues } from "app/state/context/ValueProvider"
import { useContext, useEffect, useState } from "react"

type Props = {
  onSearch: (value: string) => void
  placeholder?: string
  contextName: "cases" | "tasks"
}

export const Search: React.FC<Props> = ({ onSearch, placeholder, contextName }) => {
  const { searchString } = useContext(ContextValues)[contextName]
  const [inputValue, setInputValue] = useState(searchString)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(inputValue)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)
    if (!value) {
      onSearch("")
    }
  }

  useEffect(() => {
    setInputValue(searchString)
  }, [searchString])

  return (
    <Field>
      <Label htmlFor="search-box">Zoeken</Label>
      <SearchField onSubmit={onSubmit} style={{ width: 400 }}>
        <SearchField.Input
          placeholder={placeholder}
          name="search-box"
          value={inputValue}
          onChange={onChange}
        />
        <SearchField.Button />
      </SearchField>
    </Field>
  )
}

export default Search
