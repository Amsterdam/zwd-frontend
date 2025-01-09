const OPTIONS_ADVICE_TYPE = [
  { value: "Cursus", label: "Cursus" },
  { value: "Energieadvies", label: "Energieadvies" },
  { value: "Haalbaarheidsonderzoek", label: "Haalbaarheidsonderzoek" },
]

export const optionsForBigHoa = OPTIONS_ADVICE_TYPE

export const optionsForSmallHoa = OPTIONS_ADVICE_TYPE.filter(
  (option) => option.value !== "Haalbaarheidsonderzoek",
)
