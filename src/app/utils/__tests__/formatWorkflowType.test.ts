import { describe, it, expect } from "vitest"
import { formatWorkflowType } from "../formatWorkflowType"

describe("formatWorkflowType", () => {
  it("vervangt underscores door spaties en maakt de eerste letter een hoofdletter", () => {
    expect(formatWorkflowType("sub_workflow")).toBe("Sub workflow")
  })

  it("werkt met meerdere underscores", () => {
    expect(formatWorkflowType("main_sub_workflow_type")).toBe(
      "Main sub workflow type"
    )
  })

  it("werkt met een enkel woord zonder underscores", () => {
    expect(formatWorkflowType("workflow")).toBe("Workflow")
  })

  it("laat al hoofdlettergebruik na de eerste letter ongemoeid", () => {
    expect(formatWorkflowType("sub_Workflow_Type")).toBe("Sub Workflow Type")
  })

  it("geeft een lege string terug bij een lege string als input", () => {
    expect(formatWorkflowType("")).toBe("")
  })

  it("werkt als de string al met een hoofdletter begint", () => {
    expect(formatWorkflowType("Sub_workflow")).toBe("Sub workflow")
  })

  it("werkt met een string die alleen uit een underscore bestaat", () => {
    expect(formatWorkflowType("_")).toBe(" ")
  })

  it("werkt met underscores aan het begin van de string", () => {
    expect(formatWorkflowType("_workflow_type")).toBe(" workflow type")
  })
})
