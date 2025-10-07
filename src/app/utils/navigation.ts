/**
 * Checks if a modifier key (Cmd on Mac, Ctrl on Windows/Linux) is pressed.
 */
export const isModifierKeyPressed = (
  event: React.MouseEvent | MouseEvent
): boolean => {
  const isMac = /Mac/.test(navigator.userAgent)
  return isMac ? event.metaKey : event.ctrlKey
}

/**
 * Opens a URL in a new tab with security best practices.
 */
export const openInNewTab = (url: string): void => {
  window.open(url, "_blank", "noopener,noreferrer")
}

/**
 * Handles navigation with modifier key support.
 */
export const handleNavigationClick = (
  event: React.MouseEvent,
  url: string,
  navigate: (path: string) => void
): void => {
  if (isModifierKeyPressed(event)) {
    event.preventDefault()
    openInNewTab(url)
  } else {
    navigate(url)
  }
}
