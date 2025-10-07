import Select, { StylesConfig } from "react-select"
import type { MultiValue } from "react-select"

const COLOR_HIGHLIGHT = "#2f68d5"
const COLOR_HOVER_CLEAR_INDICATOR = "#767676"

type Props = {
  options: Option[]
  onChange: (value: string[]) => void
  value: string[]
  placeholder?: string
}

export const MultiSelectField = ({
  options,
  onChange,
  value,
  placeholder = "Selecteer..."
}: Props) => {
  // AMS look and feel via react-select's styles API
  const customStyles: StylesConfig = {
    control: (base, state) => ({
      ...base,
      width: "auto",
      minWidth: "250px",
      backgroundColor: "var(--ams-select-background-color)",
      borderColor: state.isFocused
        ? "var(--ams-select-hover-border-color)"
        : "var(--ams-select-border-color)",
      borderWidth: "var(--ams-select-border-width)",
      borderStyle: "var(--ams-select-border-style)",
      borderRadius: 0,
      fontFamily: "var(--ams-select-font-family)",
      fontSize: "var(--ams-select-font-size)",
      fontWeight: "var(--ams-select-font-weight)",
      lineHeight: "var(--ams-select-line-height)",
      boxShadow: state.isFocused
        ? "var(--ams-select-hover-box-shadow)"
        : "none",
      "&:hover": {
        boxShadow: "var(--ams-select-hover-box-shadow)"
      }
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: "var(--ams-select-border-color)",
      width: "calc(0.5*var(--ams-select-border-width))"
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor:
        state.isSelected || state.isFocused
          ? COLOR_HIGHLIGHT // Blue background by focus or selected
          : "transparent", // Default background colour
      color: state.isSelected || state.isFocused ? "white" : "black", // White text by focus or selected
      "&:active": {
        backgroundColor: COLOR_HIGHLIGHT // Blue by clicking
      }
    }),
    multiValue: (base) => ({
      ...base,
      borderRadius: 0 // Border of tag in select
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "var(--ams-color-text)" // Color of the text in the tag
    }),
    multiValueRemove: (base) => ({
      ...base,
      cursor: "pointer",
      ":hover": {
        color: COLOR_HOVER_CLEAR_INDICATOR // Color of tag remove 'x' on hover
      }
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: "var(--ams-button-primary-background-color)",
      svg: {
        width: "1.4em",
        height: "1.4em"
      },
      transition: "transform 0.2s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "none",
      "&:hover": {
        color: "var(--ams-button-primary-background-color)"
      }
    }),
    clearIndicator: (base) => ({
      ...base,
      cursor: "pointer",
      color: "var(--ams-color-text)",
      ":hover": {
        color: COLOR_HOVER_CLEAR_INDICATOR // Color of the clear all 'x' on hover
      }
    })
  }

  const selectedOptions = options.filter((option) =>
    value.includes(String(option.value))
  )

  const handleChange = (newValue: MultiValue<unknown>) => {
    const selectedOptions = newValue as Option[]
    const values = selectedOptions.map((option) => String(option.value))
    onChange(values)
  }

  return (
    <Select
      isMulti
      name="neighborhoods"
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      onChange={handleChange}
      value={selectedOptions}
    />
  )
}
