import React from "react"
import { useBagPdok } from "app/state/rest"
import MarkerCluster from "./MarkerCluster"
import type { BAGPdokAddressWithCoords } from "./MarkerCluster"

type Props = {
  zipCode?: string
}

const parsePointString = (point: string) => {
  const [lng, lat] = point
    .replace("POINT(", "")
    .replace(")", "")
    .split(" ")
    .map(parseFloat)
  return { lat, lng }
}

export const MapView: React.FC<Props> = ({ zipCode }) => {
  const [data] = useBagPdok(zipCode)
  const baseDoc = data?.response?.docs[0]

  if (!baseDoc) return null

  let firstDoc: BAGPdokAddressWithCoords | undefined

  if (baseDoc?.centroide_ll) {
    const { lat, lng } = parsePointString(baseDoc.centroide_ll)
    firstDoc = {
      ...baseDoc,
      id: baseDoc.adresseerbaarobject_id,
      latitude: lat,
      longitude: lng
    }
  }

  const markers = firstDoc ? [firstDoc] : []

  return <MarkerCluster markers={markers} />
}

export default MapView
