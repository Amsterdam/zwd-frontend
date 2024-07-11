import { Header, Screen, Grid, Overlap, SearchField, AspectRatio, Image } from "@amsterdam/design-system-react"

import "./App.css"
import "@amsterdam/design-system-assets/font/index.css"
import "@amsterdam/design-system-css/dist/index.css"
import "@amsterdam/design-system-tokens/dist/index.css"
import { useAuth } from "react-oidc-context"
function App() {
  const auth = useAuth();
  console.log(auth.user)
  return (
    <>
      <Header appName="Zaken Woningkwaliteit en Duurzaamheid" />
      <Screen maxWidth="wide">
        <main id="main">
          <Overlap>
            <AspectRatio ratio="2x-wide">
              <Image
                alt=""
                cover
                sizes="(max-width: 36rem) 640px, (max-width: 68rem) 1280px, 1600px"
                src="https://picsum.photos/1600/500"
                srcSet="https://picsum.photos/640/200 640w, https://picsum.photos/1280/400 1280w, https://picsum.photos/1600/500 1600w"
              />
            </AspectRatio>
            <Grid
              style={{
                alignSelf: "center"
              }}
            >
              <Grid.Cell
                span={{
                  medium: 6,
                  narrow: 4,
                  wide: 8
                }}
                start={{
                  medium: 2,
                  narrow: 1,
                  wide: 3
                }}
              >
                <SearchField onSubmit={function Qa(){}}>
                  <SearchField.Input
                    label="Zoeken"
                    placeholder="Wat kunnen we voor u vinden?"
                  />
                  <SearchField.Button />
                </SearchField>
              </Grid.Cell>
            </Grid>

          </Overlap>
          <button onClick={() => void auth.signinRedirect()}>Log in</button>
        </main>
      </Screen>
    </>
  )
}

export default App
