import { Table } from "app/components"
import { useBagPdok } from "app/state/rest"
import { useNavigate } from "react-router-dom"
import columns from "./columns"

type Props = {
  searchString: string
}

const MIN_SEARCH_LENGTH = 3

const isValidSearchString = (s: string) => s.length >= MIN_SEARCH_LENGTH

const SearchResults: React.FC<Props> = ({ searchString }) => {
  const navigate = useNavigate()
  const isValid = isValidSearchString(searchString)
  const searchStringBagPdok = isValid ? searchString : undefined
  const [bagData, { isBusy: loading }] = useBagPdok(searchStringBagPdok)

  // Only show addresses with a bagId
  const dataSource = bagData?.response?.docs?.filter((obj) => obj.adresseerbaarobject_id) || []

  return (
    isValid ? (
      <Table
        columns={ columns }
        data={ dataSource }
        loading={ loading }
        numLoadingRows={ 1 }
        onClickRow={({ adresseerbaarobject_id }) => navigate(`vve/${ adresseerbaarobject_id }/zaken/nieuw`)}
        emptyPlaceholder="Er zijn geen adressen gevonden"
        pagination={ false }
      />
    ) : null
  )
}

export default SearchResults
