import { Table } from "app/components"
import { useHomeownerAssociationSearch } from "app/state/rest"
import { useNavigateWithModifier } from "app/hooks"
import columns from "./columns"

type Props = {
  searchString: string
}

const MIN_SEARCH_LENGTH = 3

const isValidSearchString = (s: string) => s.length >= MIN_SEARCH_LENGTH

const SearchResultsHoa: React.FC<Props> = ({ searchString }) => {
  const navigateWithModifier = useNavigateWithModifier()
  const isValid = isValidSearchString(searchString)
  const searchStringVve = isValid ? searchString : undefined
  const [data, { isBusy: loading }] =
    useHomeownerAssociationSearch(searchStringVve)

  return (
    <Table
      columns={columns}
      data={data ?? []}
      loading={loading}
      numLoadingRows={1}
      onClickRow={({ votIdentificatie }, _index, e) =>
        navigateWithModifier(e, `/adres/${votIdentificatie}`)
      }
      emptyPlaceholder={
        isValid ? "Geen resultaten gevonden" : "Voer minimaal 3 karakters in"
      }
      pagination={false}
    />
  )
}

export default SearchResultsHoa
