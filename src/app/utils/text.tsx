import { Fragment } from "react"

/**
 * Formats text with line breaks.
 * It will add a double line break between 'paragraphs' and a single line break between 'lines',
 * which caters better for manual input and copy/pasted emails.
 */
export const formatTextWithLineBreaks = (text: string | null | undefined) => {
  if (!text) {
    return null
  }

  return text
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .map((paragraph, index, paragraphs) => (
      <Fragment key={index}>
        {paragraph.split("\n").map((line, lineIndex, lines) => (
          <Fragment key={lineIndex}>
            {line}
            {lineIndex < lines.length - 1 && <br />}
          </Fragment>
        ))}
        {index < paragraphs.length - 1 && (
          <>
            <br />
            <br />
          </>
        )}
      </Fragment>
    ))
}
