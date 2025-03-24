import { useRef } from "react"
import { usePanoramaByBagId } from "app/state/rest/custom/usePanoramaByBagId"
import useRect from "./hooks/useRect"
import styles from "./PanoramaPreview.module.css"

type Props = {
  bagId: string
  width?: number
  aspect?: number
  radius?: number
  fov?: number
}

export const PanoramaPreview: React.FC<Props> = ({
  bagId,
  width: w,
  aspect = 1.5,
  radius = 180,
  fov = 80
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const rect = useRect(ref, 100)
  const width = w ?? rect.width
  const [data] = usePanoramaByBagId(bagId, width, aspect, radius, fov)

  return (
    <div className={styles.wrapper} ref={ref}>
      {data ? (
        <img
          className={styles.img}
          src={data.url}
          alt={`Panorama preview voor BAG: ${bagId}`}
        />
      ) : (
        <div className="skeleton"></div>
      )}
    </div>
  )
}

export default PanoramaPreview
