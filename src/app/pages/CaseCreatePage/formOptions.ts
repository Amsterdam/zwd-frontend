export const APPLICATION_TYPES = {
  ACTIVATIETEAM: "Activatieteam",
  ADVIES: "Advies"
}

export const ADVIES_TYPES = {
  ENERGIEADVIES: "Energieadvies",
  HAALBAARHEIDSONDERZOEK: "Haalbaarheidsonderzoek"
}

export const ACTIVATIETEAM_TYPES = {
  INFORMATIEBIJEENKOMST: "Informatiebijeenkomst",
  LEDENVERGADERING: "Ledenvergadering"
}

export const ACTIVATIETEAM_SUBJECTS = {
  ADVIES_PRESENTATIE: "De adviseur presenteert het verduurzamingsadvies",
  OPTIE_KEUZE: "We kiezen een scenario om te verduurzamen",
  UITVOERINGS_BESLUIT: "We geven opdracht om de verduurzaming uit te voeren",
  FINANCIEEL_BESLUIT: "We beslissen hoe we de verduurzaming financieren",
  ANDERS: "Iets anders, namelijk:"
}

const createOptions = (record: Record<string, string>) =>
  Object.entries(record).map(([, value]) => ({
    value,
    label: value
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
  VVE_LID: "VvE-lid",
  VVE_BEHEERDER: "VvE-beheerder",
  CUSTOM: "Anders, namelijk:"
}

// Dynamisch genereren van opties voor rollen
export const OPTIONS_ROLE_FUNCTIONS = Object.entries(ROLE_FUNCTIONS).map(
  ([key, label]) => ({
    value: key === "CUSTOM" ? CUSTOM_ROLE : label,
    label
  })
)
