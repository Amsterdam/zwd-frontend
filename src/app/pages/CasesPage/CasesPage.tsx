import { Heading } from "@amsterdam/design-system-react"
import { useApiHook } from "app/hooks" 

export const CasesPage: React.FC = () => {
  const [data, loading, error] = useApiHook("cases")
  console.log("DATA, loading, error", data, loading, error)

  return (
    <>
      <Heading level={ 3 } >
        Zakenoverzicht
      </Heading>
    </>
  )
}

export default CasesPage
    