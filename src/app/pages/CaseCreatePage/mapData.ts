import { ADVICE_TYPES } from "./formOptions"

export type FormTypes = {
  fullname: string[]
  email: string[]
  phone: string[]
  role: string[]
  custom_role?: string[]
}

export type CaseCreateFormTypes = Components.Schemas.CaseCreate & FormTypes

const mapData = (
  data: CaseCreateFormTypes,
  homeowner_association: Components.Schemas.HomeownerAssociation["id"]
): CaseCreateInput => ({
  description: data.description,
  advice_type: data.advice_type,
  homeowner_association,
  contacts:
    data.advice_type === ADVICE_TYPES.CURSUS
      ? []
      : data?.fullname?.map((_, index) => ({
        fullname: data.fullname[index],
        email: data.email[index],
        phone: data.phone[index],
        role: data?.custom_role?.[index] || data.role[index]
      })) || []
})


export default mapData

export type DefaultDummyValues = Omit<CaseCreateFormTypes, "id">

export const defaultDummyValues: DefaultDummyValues = {
  advice_type: "Energieadvies",
  fullname: ["Chewbacca", "Han Solo"],
  email: ["chewbacca@starwars.org", "hansolo@starwars.org"],
  phone: ["0612345678", "0031611112222"],
  role: ["Bestuurslid", "Vve-lid"],
  description: "Dit is een toelichting test"
}
