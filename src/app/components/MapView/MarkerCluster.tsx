import { useEffect, useRef, useState } from "react"
import L, { LatLngTuple } from "leaflet"
import Supercluster from "supercluster"
import type { BBox, Point } from "geojson"
import { getCrsRd, toGeoJSON, createClusterIcon } from "./utils"

import styles from "./styles.module.css"
import "leaflet/dist/leaflet.css"

const CLUSTER_STYLES = {
  default: styles.markerCluster,
  small: styles.markerClusterSmall,
  medium: styles.markerClusterMedium,
  large: styles.markerClusterLarge
}

export type BAGPdokAddressWithCoords = BAGPdokAddress & {
  id: string
  latitude: number
  longitude: number
}

type Props = {
  markers?: BAGPdokAddressWithCoords[]
}

type MockDataType = {
  id: string
  geometry: Point
}

type MockProperties = Omit<MockDataType, "geometry">

const MarkerCluster: React.FC<Props> = ({ markers = [] }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null)
  const [markersInstance, setMarkersInstance] =
    useState<L.GeoJSON<MockProperties> | null>(null)
  const createdMapInstance = useRef(false)
  const firstListing = markers[0]

  const defaultCenter: LatLngTuple = [52.370216, 4.895168]

  const [center, setCenter] = useState<LatLngTuple>(() => {
    if (firstListing && firstListing.latitude && firstListing.longitude) {
      return [firstListing.latitude, firstListing.longitude]
    }
    return defaultCenter
  })
  const [zoom, setZoom] = useState(8)

  const clusterIndex = new Supercluster<MockProperties>({
    log: false,
    radius: 40,
    extent: 3000,
    nodeSize: 64,
    maxZoom: 13
  })

  // Parse any API data to GeoJSON
  const parsedGeoJson = toGeoJSON(markers)

  // Load the parsed GeoJSON data into the cluster index
  clusterIndex.load(parsedGeoJson?.features)

  // Set the Leaflet map and Amsterdam base layer
  useEffect(() => {
    if (containerRef.current === null || createdMapInstance.current !== false) {
      return
    }

    const map = new L.Map(containerRef.current, {
      center,
      zoom,
      layers: [
        L.tileLayer("https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png", {
          attribution: "",
          subdomains: ["t1", "t2", "t3", "t4"],
          tms: true
        })
      ],
      zoomControl: false,
      maxZoom: 16,
      minZoom: 6, // TODO in ARM this is 3?
      crs: getCrsRd(),
      maxBounds: [
        [52.25168, 4.64034],
        [52.50536, 5.10737]
      ],
      scrollWheelZoom: false
    })

    map.on("click mousedown", () => {
      map.scrollWheelZoom.enable()
    })

    map.attributionControl.setPrefix(false)

    createdMapInstance.current = true
    setMapInstance(map)

    // Listen for map changes to know when to update the clusters
    map.on("moveend", () => {
      setZoom(map.getZoom())
      setCenter([map.getCenter().lat, map.getCenter().lng])
    })

    return () => {
      if (mapInstance) mapInstance.remove()
    }
  }, [])

  useEffect(() => {
    if (mapInstance && !markersInstance) {
      // Empty Layer Group that will receive the clusters data on the fly.
      const markers = L.geoJSON(null, {
        pointToLayer: (...args) => createClusterIcon(...args, CLUSTER_STYLES)
      }).addTo(mapInstance)
      setMarkersInstance(markers)
    }

    return () => {
      if (markersInstance) {
        markersInstance.off()
        markersInstance.remove()
      }
    }
  }, [mapInstance, markersInstance])

  useEffect(() => {
    if (markersInstance && mapInstance) {
      // Clear any already rendered clusters/markers
      markersInstance.clearLayers()
      markersInstance.off()

      // Get the current map bounds to prevent clustering every data record
      const bounds = mapInstance.getBounds()
      const bbox: BBox = [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth()
      ]

      // Return any map data within the current bounds
      const clusterMarkers = clusterIndex.getClusters(
        bbox,
        mapInstance.getZoom()
      )

      if (markersInstance && clusterMarkers.length) {
        // Render the cluster(s) and marker(s) to the map
        clusterMarkers.forEach((m) => markersInstance?.addData(m))
      }
    }
  }, [mapInstance, markersInstance, clusterIndex, zoom])

  useEffect(() => {
    const firstListing = markers[0]
    if (firstListing) {
      const { latitude, longitude } = firstListing
      setCenter([latitude, longitude])
    }
  }, [markers])

  return <div className={styles.container} ref={containerRef} />
}

export default MarkerCluster
