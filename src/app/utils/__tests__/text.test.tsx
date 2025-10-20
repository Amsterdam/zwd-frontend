import React from "react"
import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { formatTextWithLineBreaks } from "../text"

describe("formatTextWithLineBreaks", () => {
  it("should return null for null or undefined input", () => {
    const { container: container1 } = render(<>{formatTextWithLineBreaks(null)}</>)
    expect(container1.firstChild).toBeNull()

    const { container: container2 } = render(<>{formatTextWithLineBreaks(undefined)}</>)
    expect(container2.firstChild).toBeNull()
  })

  it("should handle an empty string", () => {
    const { container } = render(<>{formatTextWithLineBreaks("")}</>)
    expect(container.firstChild).toBeNull()
  })

  it("should handle a string with single line breaks", () => {
    const { container } = render(<>{formatTextWithLineBreaks("line 1\nline 2\nline 3")}</>)
    expect(container).toHaveTextContent("line 1line 2line 3")
    expect(container.querySelectorAll("br").length).toBe(2)
  })

  it("should handle a string with double line breaks", () => {
    const { container } = render(<>{formatTextWithLineBreaks("paragraph 1\n\nparagraph 2")}</>)
    expect(container).toHaveTextContent("paragraph 1paragraph 2")
    expect(container.querySelectorAll("br").length).toBe(2)
  })

  it("should handle a mix of single and double line breaks", () => {
    const { container } = render(<>{formatTextWithLineBreaks("line 1\nline 2\n\nparagraph 2")}</>)
    expect(container).toHaveTextContent("line 1line 2paragraph 2")
    // One br for the line break, two for the paragraph break
    expect(container.querySelectorAll("br").length).toBe(3)
  })

  it("should handle leading/trailing whitespace and empty lines", () => {
    const { container } = render(<>{formatTextWithLineBreaks("\n  paragraph 1  \n\n\n  paragraph 2  \n")}</>)
    expect(container).toHaveTextContent("paragraph 1paragraph 2")
    expect(container.querySelectorAll("br").length).toBe(2)
    // Extra check to see if there is no unexpected text rendered
    expect(container.textContent).toBe("paragraph 1paragraph 2")
  })
})
