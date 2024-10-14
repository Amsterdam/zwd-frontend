import { HousingIcon } from "@amsterdam/design-system-react-icons"
import { useParams } from "react-router-dom"
import { PanoramaPreview, PageHeading } from "app/components"
import HoaDescription from "./HoaDescription"


export const AddressPage: React.FC = () => {
  const { bagId } = useParams<{ bagId: string }>()  

  return (
    <>
      <PageHeading label="Adresoverzicht" icon={ HousingIcon } />
      { bagId && <PanoramaPreview bagId={ bagId } aspect={ 4 } fov={ 120 } />}
      { bagId && <HoaDescription bagId={ bagId } /> }
    </>
  )
}

export default AddressPage
    