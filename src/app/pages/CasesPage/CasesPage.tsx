import { Heading } from "@amsterdam/design-system-react"
import { useCases } from "app/state/rest"

export const CasesPage: React.FC = () => {
  // const [data, loading, error] = useApiHook("cases")
  const [data, { isBusy }] = useCases()
  console.log("DATA, loading", data, isBusy)

  return (
    <>
      <Heading level={ 3 } >
        Zakenoverzicht
      </Heading>
      <ul>
        {data?.map((i) => <li key={ i.id }>`${ i.id }-${ i.description }`</li>)}
      </ul>
    </>
  )
}

export default CasesPage
    