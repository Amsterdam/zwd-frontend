import ReactDOM from "react-dom/client"
import { AuthProvider } from "react-oidc-context"
import App from "./App.tsx"
import { oidcConfig } from "./utils/authConst.ts" 
import "./index.css"


ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider {...oidcConfig}>
    <App />
  </AuthProvider>
)
