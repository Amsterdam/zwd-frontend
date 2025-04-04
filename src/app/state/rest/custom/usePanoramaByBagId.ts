import { useBagPdokByBagId, usePanorama } from "app/state/rest"

const extractLatLng = (point?: BAGPdokAddress["centroide_ll"]) => {
  // Ensure the string starts with "POINT(" and ends with ")"
  if (point && point.startsWith("POINT(") && point.endsWith(")")) {
    // Remove "POINT(" from the start and ")" from the end
    const coordinates = point.slice(6, -1)
    // Split the coordinates by space
    const [lng, lat] = coordinates.split(" ")
    // Parse the coordinates to floats
    return {
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    }
  }
  return null
}

export const usePanoramaByBagId = (
  bagId: string,
  width: number | undefined,
  aspect: number | undefined,
  radius: number,
  fov: number | undefined
) => {
  const [data] = useBagPdokByBagId(bagId)
  const docs = data?.response?.docs
  const foundAddress = docs && docs[0] ? docs[0] : undefined
  const latLng = extractLatLng(foundAddress?.centroide_ll)

  return usePanorama(latLng?.lat, latLng?.lng, width, aspect, radius, fov, {
    lazy: foundAddress === undefined || width === undefined
  })
}

export default usePanoramaByBagId
