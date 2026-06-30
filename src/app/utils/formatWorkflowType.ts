/*
 * This function formats a workflow type string by replacing underscores with spaces and capitalizing the first letter.
 * @param workflowType - The workflow type string to format.
 * @returns The formatted workflow type string.
 * Example: sub_workflow -> Sub workflow
 */
export const formatWorkflowType = (workflowType: string): string =>
  workflowType.replace(/_/g, " ").replace(/^./, (char) => char.toUpperCase())
