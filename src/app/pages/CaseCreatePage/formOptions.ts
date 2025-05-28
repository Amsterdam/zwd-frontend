export const ADVICE_TYPES = {
  CURSUS: "Cursus",
  ENERGIEADVIES: "Energieadvies",
  HAALBAARHEIDSONDERZOEK: "Haalbaarheidsonderzoek"
}

const OPTIONS_ADVICE_TYPE = Object.entries(ADVICE_TYPES).map(([, value]) => ({
  value,
  label: value
}))

export const adviceOptionsForLargeHoa = OPTIONS_ADVICE_TYPE

export const adviceOptionsForSmallHoa = OPTIONS_ADVICE_TYPE.filter(
  (option) => option.value !== ADVICE_TYPES.HAALBAARHEIDSONDERZOEK
)

export const CUSTOM_ROLE = "CUSTOM_ROLE"

export const ROLE_FUNCTIONS = {
  BESTUURSLID: "Bestuurslid",
  COMMISSIELID_DUURZAAM: "Commissielid duurzaam",
  COMMISSIELID_TECHNISCH: "Commissielid technisch",
  VVE_LID: "Vve-lid",
  VVE_BEHEERDER: "Vve-beheerder",
  CUSTOM: "Anders, namelijk:"
}

// Dynamisch genereren van opties voor rollen
export const OPTIONS_ROLE_FUNCTIONS = Object.entries(ROLE_FUNCTIONS).map(
  ([key, label]) => ({
    value: key === "CUSTOM" ? CUSTOM_ROLE : label,
    label
  })
)
