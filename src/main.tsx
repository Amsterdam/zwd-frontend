import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { AuthProvider } from "react-oidc-context"
import App from "./App.tsx"
import { oidcConfig } from "./app/utils/authConst.ts" 

import "./index.css"
import "@amsterdam/design-system-assets/font/index.css"
import "@amsterdam/design-system-css/dist/index.css"
import "@amsterdam/design-system-tokens/dist/index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </StrictMode>
)
