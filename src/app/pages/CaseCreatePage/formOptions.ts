const OPTIONS_ADVICE_TYPE = [
  { value: "Cursus", label: "Cursus" },
  { value: "Energieadvies", label: "Energieadvies" },
  { value: "Haalbaarheidsonderzoek", label: "Haalbaarheidsonderzoek" }
]

export const optionsForBigHoa = OPTIONS_ADVICE_TYPE

export const optionsForSmallHoa = OPTIONS_ADVICE_TYPE.filter(
  (option) => option.value !== "Haalbaarheidsonderzoek"
)

export const CUSTOM_ROLE = "CUSTOM_ROLE"

export const OPTIONS_ROLE_FUNCTIONS = [
  { value: "Bestuurslid", label: "Bestuurslid" },
  { value: "Commissielid duurzaam", label: "Commissielid duurzaam" },
  { value: "Commissielid technisch", label: "Commissielid technisch" },
  { value: "Vve-lid", label: "Vve-lid" },
  { value: "Vve-beheerder", label: "Vve-beheerder" },
  { value: CUSTOM_ROLE, label: "Anders, namelijk:" }
]
