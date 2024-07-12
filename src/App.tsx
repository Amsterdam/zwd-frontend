import { useEffect, useState } from "react"
import { useAuth, hasAuthParams } from "react-oidc-context"
import { RouterProvider } from "react-router-dom"
import { useDecodedToken } from "app/hooks"
import router from "app/routing/router"


function App() {
  const auth = useAuth()
  const decodedToken = useDecodedToken()
  const [hasTriedSignin, setHasTriedSignin] = useState(false)

  console.log("USER=>", decodedToken)

  // automatically sign-in
  useEffect(() => {
    if (!hasAuthParams() &&
        !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading &&
        !hasTriedSignin
    ) {
      void auth.signinRedirect()
      setHasTriedSignin(true)
    }
  }, [auth, hasTriedSignin])

  if (auth.isLoading) {
    return <div>Signing you in/out...</div>
  }

  if (!auth.isAuthenticated) {
    return <div>Unable to log in</div>
  }

  return (
    <>
      <RouterProvider router={router} />
      <h1>Hi { decodedToken?.given_name }</h1>
      <button onClick={() => void auth.removeUser()}>Log out</button>
    </>
  )
}

export default App
