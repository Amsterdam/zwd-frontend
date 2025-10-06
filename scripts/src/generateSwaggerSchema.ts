import { exec } from "child_process"
import { config } from "dotenv"

config({ path: ".env.local" })

// To run against another backend than the default, add a `.env.local` file with the following content:
// VITE_SWAGGER_SCHEMA_URL=http://localhost:8081/api/schema/?format=json
const url = process.env.VITE_SWAGGER_SCHEMA_URL || "https://acc.api.zwd.amsterdam.nl/api/schema/?format=json"

console.log(`👉 Generating schema from \`${ url }\``)

exec(`dtsgen -o ./src/__generated__/apiSchema.d.ts --url ${ url }`,
  (error, stdout, stderr) => {
    if (error) {
      console.log("ERROR")
      console.log(error.message)
      process.exit(1)
      return
    }

    if (stderr) {
      console.log("ERROR")
      console.log(stderr)
      process.exit(1)
      return
    }

    console.log(stdout)
  }
)
