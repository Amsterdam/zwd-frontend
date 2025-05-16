import styles from "./Spinner.module.css"

type Props = {
  loading?: boolean
  size?: number
  color?: string
}

export const Spinner: React.FC<Props> = ({
  loading = true,
  size = 32,
  color = "#000000"
}) =>
  loading ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      fill={color}
      className={styles.spinner}
    >
      <path d="M50 100C22.4 99.967.033 77.6 0 50h10c0 22.091 17.909 40 40 40s40-17.909 40-40-17.909-40-40-40V0c27.614 0 50 22.386 50 50s-22.386 50-50 50"></path>
    </svg>
  ) : (
    <></>
  )

export const PageSpinner: React.FC = () => (
  <div className={styles.pageSpinner}>
    <Spinner size={48} />
  </div>
)
