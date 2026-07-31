import { useHomeownerAssociation } from "app/state/rest"

type Props = {
  id: components["schemas"]["HomeownerAssociation"]["id"]
}

export const HoaName: React.FC<Props> = ({ id }) => {
  const [data] = useHomeownerAssociation(id)

  return <div>{data?.name}</div>
}

export default HoaName
