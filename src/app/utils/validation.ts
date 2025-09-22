export const validationRequired = { required: true }

export const validationEmail = {
  ...validationRequired,
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Dit is geen geldig e-mailadres",
  },
}

export const validationPhone = {
  ...validationRequired,
  pattern: {
    value: /^(\+31|0031|0)[1-9][0-9]{8,9}$/,
    message: "Dit is geen geldig telefoonnummer",
  }
}
