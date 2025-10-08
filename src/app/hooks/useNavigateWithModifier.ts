import { useNavigate } from "react-router-dom"
import { handleNavigationClick } from "app/utils/navigation"

/**
 * Custom hook that provides navigation with modifier key support
 *
 * @returns A function that handles navigation:
 * - Regular click: navigates in same tab using router
 * - Cmd/Ctrl + click: opens in new tab
 *
 * @example
 * const navigateWithModifier = useNavigateWithModifier()
 *
 * <div onClick={(e) => navigateWithModifier(e, '/cases/123')}>
 *   Click me
 * </div>
 */
export const useNavigateWithModifier = () => {
  const navigate = useNavigate()

  return (e: React.MouseEvent, url: string) => {
    handleNavigationClick(e, url, navigate)
  }
}
