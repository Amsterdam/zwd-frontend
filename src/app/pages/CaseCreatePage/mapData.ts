import {
  ACTIVATIETEAM_SUBJECTS,
  ADVIES_TYPES,
  APPLICATION_TYPES
} from "./formOptions"

type FormTypes = {
  request_date?: string
  fullname: string[]
  email: string[]
  phone: string[]
  role: string[]
  custom_role?: string[]
  activationteam_type?: string
  activationteam_subject?: string
  activationteam_subject_other?: string
  activationteam_meeting_date?: string
}

type FormAdviceType = Components.Schemas.AdviceTypeEnum | ""

export type CaseCreateFormTypes = Omit<
  Components.Schemas.CaseCreate,
  "advice_type" | "activation_team" | "contacts"
> &
  FormTypes & {
    advice_type?: FormAdviceType
  }

const mapData = (
  data: CaseCreateFormTypes,
  homeowner_association: Components.Schemas.HomeownerAssociation["id"]
): CaseCreateInput => ({
  request_date: data.request_date,
  application_type: data.application_type,
  advice_type: (
    data.application_type === APPLICATION_TYPES.ADVIES
      ? data.advice_type
      : undefined
  ) as unknown as Components.Schemas.CaseCreate["advice_type"],
  description: data.description,
  homeowner_association,
  contacts:
    data?.advice_type === ADVIES_TYPES.CURSUS
      ? []
      : data?.fullname?.map((_, index) => ({
        fullname: data.fullname[index],
        email: data.email[index],
        phone: data.phone[index],
        role: data?.custom_role?.[index] || data.role[index]
      })) || [],
  ...(data.application_type === APPLICATION_TYPES.ACTIVATIETEAM
    ? {
      activation_team: {
        type: data.activationteam_type,
        subject:
            data.activationteam_subject === ACTIVATIETEAM_SUBJECTS.ANDERS
              ? data.activationteam_subject_other
              : data.activationteam_subject,
        meeting_date: data.activationteam_meeting_date
      }
    }
    : {})
})

export default mapData

export type DefaultDummyValues = Omit<CaseCreateFormTypes, "id">

export const defaultDummyValues: DefaultDummyValues = {
  request_date: "2025-09-15",
  application_type: "Advies",
  advice_type: "Energieadvies",
  fullname: ["Chewbacca", "Han Solo"],
  email: ["chewbacca@starwars.org", "hansolo@starwars.org"],
  phone: ["0612345678", "0031611112222"],
  role: ["Bestuurslid", "Vve-lid"],
  description: "Dit is een toelichting test"
}

export const dummyValuesActivationTeam: DefaultDummyValues = {
  request_date: "2025-09-15",
  application_type: "Activatieteam",
  activationteam_type: "Informatiebijeenkomst",
  activationteam_subject: ACTIVATIETEAM_SUBJECTS.ANDERS,
  activationteam_subject_other:
    "Een andere reden om een bijeenkomst te organiseren",
  activationteam_meeting_date: "2026-02-01",
  fullname: ["Chewbacca", "Han Solo"],
  email: ["chewbacca@starwars.org", "hansolo@starwars.org"],
  phone: ["0612345678", "0031611112222"],
  role: ["Bestuurslid", "Vve-lid"],
  description: "Dit is een toelichting test"
}
