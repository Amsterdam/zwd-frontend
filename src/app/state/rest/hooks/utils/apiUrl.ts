import slashSandwich from "app/routing/utils/slashSandwich"
import { env } from "app/config/env"

/**
 * Utility function to create an API URL
 */
export const makeApiUrl = (...paths: Array<number|string|undefined>) =>
  slashSandwich([env.VITE_API_URL, ...paths])
