// Leaflet was built before Webpack, Vite (and other build engines) were used so certain assets and elements require manual configuration
// @see https://github.com/Leaflet/Leaflet/issues/4968#issuecomment-483402699
import L from "leaflet"
import type { Feature, Point } from "geojson"
import Supercluster from "supercluster"
import MarkerIcon from "./MarkerIcon.svg"

const iconDefault = L.icon({
  iconUrl: MarkerIcon,
  iconSize: [39, 39],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = iconDefault

export type ClusterStyles = {
  default: string
  small: string
  medium: string
  large: string
}

export const createClusterIcon = <P extends Supercluster.ClusterProperties>(
  feature: Feature<Point, P>,
  latlng: L.LatLng,
  styles: ClusterStyles
) => {
  if (!feature.properties.cluster) return L.marker(latlng)

  const count = feature.properties.point_count
  const sizeClassName =
    count < 3 ? styles.small : count < 10 ? styles.medium : styles.large
  const icon = L.divIcon({
    html: `<div><span>${ feature.properties.point_count_abbreviated }</span></div>`,
    className: `${ styles.default } ${ sizeClassName }`,
    iconSize: L.point(40, 40)
  })

  return L.marker(latlng, {
    icon: icon
  })
}

export default createClusterIcon
