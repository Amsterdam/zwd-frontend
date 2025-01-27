import { useEffect, useState } from "react"
import { useAuth, hasAuthParams } from "react-oidc-context"
import { RouterProvider } from "react-router-dom"
import router from "app/routing/router"
import { LoggingInPage, LoggingInErrorPage } from "app/pages"
import ApiProvider from "app/state/rest/provider/ApiProvider"


const App = () => {
  const auth = useAuth()
  const [hasTriedSignin, setHasTriedSignin] = useState(false)

  // automatically sign-in
  useEffect(() => {
    if (!hasAuthParams() &&
        !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading &&
        !hasTriedSignin
    ) {
      const currentUrl = new URL(window.location.href)
      const fullPathWithQuery = `${ currentUrl.pathname }${ currentUrl.search }`
      void auth.signinRedirect({
        url_state: fullPathWithQuery 
      })
      setHasTriedSignin(true)
    }
  }, [auth, hasTriedSignin])

 
  if (auth.isLoading) {
    return <LoggingInPage />
  }

  if (!auth.isAuthenticated) {
    return <LoggingInErrorPage />
  }

  return (
    <ApiProvider>
      <RouterProvider router={router} />
    </ApiProvider>
  )
}

export default App
