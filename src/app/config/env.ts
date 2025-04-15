declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type MyWindow = Window & { env: any }
}

type envType = {
  [name: string]: string | number
}

export const env: envType = {
  ...import.meta.env,
  ...(window as unknown as MyWindow)["env"]
}
