export const APPLICATION_TYPES = {
  ACTIVATIETEAM: "Activatieteam",
  ADVIES: "Advies",
}

export const ADVIES_TYPES = {
  ENERGIEADVIES: "Energieadvies",
  HAALBAARHEIDSONDERZOEK: "Haalbaarheidsonderzoek",
}

export const ACTIVATIETEAM_TYPES = {
  INFORMATIEBIJEENKOMST: "Informatiebijeenkomst",
  LEDENVERGADERING: "Ledenvergadering",
}

export const ACTIVATIETEAM_SUBJECTS = {
  ADVIES_PRESENTATIE:
    "In de informatiebijeenkomst worden de uitkomsten van het advies of haalbaarheidsadvies gepresenteerd.",
  OPTIE_KEUZE:
    "U wilt een keuze maken voor een van de verduurzamingsopties op de ledenvergadering. Op basis van deze keuze kunt u plannen gaan maken voor de uitvoering.",
  UITVOERINGS_BESLUIT:
    "U heeft de plannen voor het verduurzamingsscenario gemaakt en bent klaar om deze uit te voeren. U wilt op de ledenvergadering besluiten een opdracht te verlenen (aan bijvoorbeeld een aannemer).",
  FINANCIEEL_BESLUIT:
    "In de ledenvergadering nemen we het besluit om met de vve een financiering af te sluiten om de verduurzamingsmaatregelen te kunnen betalen.",
  ANDERS: "Anders, namelijk:",
}

const createOptions = (record: Record<string, string>) =>
  Object.entries(record).map(([, value]) => ({
    value,
    label: value,
  }))

export const optionsApplicationTypes = createOptions(APPLICATION_TYPES)

export const optionsActivatieteamTypes = createOptions(ACTIVATIETEAM_TYPES)

export const optionsActivatieteamSubjects = createOptions(
  ACTIVATIETEAM_SUBJECTS
)

const allAdviceOptions = createOptions(ADVIES_TYPES)

export const adviceOptionsForLargeHoa = allAdviceOptions

export const adviceOptionsForSmallHoa = allAdviceOptions.filter(
  (option) => option.value !== ADVIES_TYPES.HAALBAARHEIDSONDERZOEK
)

export const CUSTOM_ROLE = "CUSTOM_ROLE"

export const ROLE_FUNCTIONS = {
  BESTUURSLID: "Bestuurslid",
  COMMISSIELID_DUURZAAM: "Commissielid duurzaam",
  COMMISSIELID_TECHNISCH: "Commissielid technisch",
  VVE_LID: "Vve-lid",
  VVE_BEHEERDER: "Vve-beheerder",
  CUSTOM: "Anders, namelijk:",
}

// Dynamisch genereren van opties voor rollen
export const OPTIONS_ROLE_FUNCTIONS = Object.entries(ROLE_FUNCTIONS).map(
  ([key, label]) => ({
    value: key === "CUSTOM" ? CUSTOM_ROLE : label,
    label,
  })
)
