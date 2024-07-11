import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { AuthProvider } from 'react-oidc-context';

const oidcConfig = {
  authority: 'https://login.microsoftonline.com/72fca1b1-2c2e-4376-a445-294d80196804',
  client_id: 'c622ea17-3c29-4b8f-ae84-56dda14419e7',
  redirect_uri: 'http://localhost:5173',
  response_type: 'code',
  scope: 'openid',
  post_logout_redirect_uri: 'http://localhost:5173',
  metadata: {
    issuer: 'https://login.microsoftonline.com/72fca1b1-2c2e-4376-a445-294d80196804/v2.0',
    authorization_endpoint: 'https://login.microsoftonline.com/72fca1b1-2c2e-4376-a445-294d80196804/oauth2/v2.0/authorize',
    token_endpoint: 'https://login.microsoftonline.com/72fca1b1-2c2e-4376-a445-294d80196804/oauth2/v2.0/token',
    end_session_endpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/logout'
  }
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider {...oidcConfig}>
    <App />
  </AuthProvider>,
)
