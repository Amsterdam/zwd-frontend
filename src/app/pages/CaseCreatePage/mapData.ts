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
): Omit<Components.Schemas.CaseCreate, "id"> => ({
  description: data.description,
  advice_type: data.advice_type,
  homeowner_association,
  contacts: data?.fullname
    ? [{
      fullname: data.fullname[0],
      email: data.email[0],
      phone: data.phone[0],
      role:
        data?.custom_role && data?.custom_role[0]
          ? data?.custom_role[0]
          : data.role[0]
    }, {
      fullname: data.fullname[1],
      email: data.email[1],
      phone: data.phone[1],
      role:
        data?.custom_role && data?.custom_role[1]
          ? data?.custom_role[1]
          : data.role[1]
    }]
    : []
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
