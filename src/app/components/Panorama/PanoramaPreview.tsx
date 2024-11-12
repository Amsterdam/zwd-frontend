import { useRef } from "react"
import styled from "styled-components"
import { usePanoramaByBagId } from "app/state/rest/custom/usePanoramaByBagId"
import useRect from "./hooks/useRect"

type Props = {
  bagId: string
  width?: number
  aspect?: number
  radius?: number
  fov?: number
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .skeleton {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid #E6E6E6;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`

export const PanoramaPreview: React.FC<Props> = ({ bagId, width: w, aspect = 1.5, radius = 180, fov = 80 }) => {
  const ref = useRef<HTMLDivElement>(null)
  const rect = useRect(ref, 100)
  const width = w ?? rect.width
  const [data] = usePanoramaByBagId(bagId, width, aspect, radius, fov)

  return (
    <Wrapper ref={ ref }>
      { data ? (
        <Img src={ data.url } alt={ `Panorama preview voor BAG: ${ bagId }` } />
      ) : <div className="skeleton"></div>
      }
    </Wrapper>
  )
}

export default PanoramaPreview
