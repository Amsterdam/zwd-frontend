import type { Feature, FeatureCollection, Point } from "geojson"

export function toGeoJSON<DataType extends { latitude: number, longitude: number }>(
  data: DataType[] | undefined
) {
  type DataGeometry = Point;
  type DataProperties = Omit<DataType, "latitude" | "longitude">;

  if (!data || !data.length) {
    return {
      type: "FeatureCollection",
      features: []
    }
  }

  const features = data.map(item => {
    const { latitude, longitude, ...other } = item

    const geometry: DataGeometry = {
      type: "Point",
      coordinates: [longitude, latitude]
    }

    const feature: Feature<DataGeometry, DataProperties> = {
      type: "Feature",
      geometry: geometry,
      properties: {
        ...other
      }
    }

    return feature
  })

  const geojson: FeatureCollection<DataGeometry, DataProperties> = {
    type: "FeatureCollection",
    features
  }

  return geojson
}
