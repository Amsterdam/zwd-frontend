import React, { useMemo } from "react"
import styles from "./SmallSkeleton.module.css"

type Props = {
  loading?: boolean
  height?: number
  maxRandomWidth?: number
}

export const SmallSkeleton: React.FC<Props> = ({
  loading = true,
  maxRandomWidth = 100,
  height = 5
}) => {
  const width = useMemo(
    () => Math.round(Math.random() * (maxRandomWidth - 50)) + 50,
    [maxRandomWidth]
  )

  return loading ? (
    <div
      className={styles.skeleton}
      style={{ width, height: height * 4 }}
      data-testid="small-skeleton"
    />
  ) : (
    <></>
  )
}

export default SmallSkeleton
