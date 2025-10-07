import { Table } from "app/components"
import { useBagPdok } from "app/state/rest"
import { useNavigateWithModifier } from "app/hooks"
import columns from "./columns"

type Props = {
  searchString: string
}

const MIN_SEARCH_LENGTH = 3

const isValidSearchString = (s: string) => s.length >= MIN_SEARCH_LENGTH

const SearchResults: React.FC<Props> = ({ searchString }) => {
  const navigateWithModifier = useNavigateWithModifier()
  const isValid = isValidSearchString(searchString)
  const searchStringBagPdok = isValid ? searchString : undefined
  const [bagData, { isBusy: loading }] = useBagPdok(searchStringBagPdok)

  // Only show addresses with a bagId
  const dataSource =
    bagData?.response?.docs?.filter((obj) => obj.adresseerbaarobject_id) || []

  return (
    <Table
      columns={columns}
      data={dataSource}
      loading={loading}
      numLoadingRows={1}
      onClickRow={({ adresseerbaarobject_id }, _index, e) =>
        navigateWithModifier(e, `/adres/${adresseerbaarobject_id}`)
      }
      emptyPlaceholder={
        isValid ? "Geen resultaten gevonden" : "Voer minimaal 3 karakters in"
      }
      pagination={false}
    />
  )
}

export default SearchResults
