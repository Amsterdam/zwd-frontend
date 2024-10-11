import { exec } from "child_process"

// const url = "https://api.zwd.woon-o.azure.amsterdam.nl/api/schema/?format=json"
const url = "http://localhost:8081/api/schema/?format=json"

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
